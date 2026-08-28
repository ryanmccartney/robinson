"use strict";

const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const logger = require("@utils/logger")(module);

const dbHost = process.env.DB_HOST || "mongo";
const dbName = process.env.DB_NAME || "robinson";
const dbPort = process.env.DB_PORT || 27017;
const dbUser = process.env.DB_USER || "robinson";
const dbPassword = process.env.DB_PASSWORD || "robinson123";

const uri = `mongodb://${dbUser}:${dbPassword.replace("@", "%40")}@${dbHost}:${dbPort}/${dbName}?authSource=admin`;
const sessionSecret = process.env.SESSION_SECRET || "sup3rs3cr3t";
const sessionSecure = Boolean(process.env.SESSION_SECURE) || false;

const INITIAL_RETRY_DELAY_MS = 2000;
const MAX_RETRY_DELAY_MS = 30000;

// connect-mongodb-session throws synchronously out of its internal promise
// chain if its very first connection attempt fails and nobody is listening
// for the store's 'error' event (see its handleError(): "if
// (!this._emitter.listeners('error').length && !callback) throw error").
// With no listener attached, a DNS hiccup resolving the DB host on startup
// (e.g. app and db containers restarting together on a redeploy) becomes an
// unhandled rejection that kills the whole process. This wrapper always
// keeps an 'error' listener attached and retries the underlying store with
// capped exponential backoff instead of ever letting that happen.
//
// It extends session.Store (not EventEmitter directly) because passport
// calls req.logIn() -> req.session.regenerate(), which lives on
// session.Store.prototype along with load() and createSession().
// Extending EventEmitter alone makes every login throw
// "this.req.sessionStore.regenerate is not a function". session.Store
// itself extends EventEmitter, so the retry logic below is unaffected.
class RetryingSessionStore extends session.Store {
    constructor(options) {
        super();
        this.options = options;
        this.current = null;
        this.retryDelay = INITIAL_RETRY_DELAY_MS;
        this._connect();
    }

    _connect() {
        const store = new MongoDBStore(this.options, (error) => {
            if (error) {
                return; // surfaced via the 'error' listener below
            }
            this.retryDelay = INITIAL_RETRY_DELAY_MS;
            this.current = store;
            logger.info(
                `Connected to session store (collection: ${this.options.collection})`
            );
            this.emit("connected");
        });

        store.on("error", (error) => {
            logger.warn(
                `Session store connection failed, retrying in ${this.retryDelay}ms: ${error.message}`
            );
            setTimeout(() => this._connect(), this.retryDelay);
            this.retryDelay = Math.min(this.retryDelay * 2, MAX_RETRY_DELAY_MS);
        });
    }

    get(id, callback) {
        if (!this.current) {
            return this.once("connected", () => this.current.get(id, callback));
        }
        return this.current.get(id, callback);
    }

    set(id, sessionData, callback) {
        if (!this.current) {
            return this.once("connected", () =>
                this.current.set(id, sessionData, callback)
            );
        }
        return this.current.set(id, sessionData, callback);
    }

    touch(id, sessionData, callback) {
        if (!this.current) {
            return this.once("connected", () =>
                this.current.touch(id, sessionData, callback)
            );
        }
        return this.current.touch(id, sessionData, callback);
    }

    destroy(id, callback) {
        if (!this.current) {
            return this.once("connected", () =>
                this.current.destroy(id, callback)
            );
        }
        return this.current.destroy(id, callback);
    }

    all(callback) {
        if (!this.current) {
            return this.once("connected", () => this.current.all(callback));
        }
        return this.current.all(callback);
    }

    clear(callback) {
        if (!this.current) {
            return this.once("connected", () => this.current.clear(callback));
        }
        return this.current.clear(callback);
    }
}

const store = new RetryingSessionStore({
    uri: uri,
    collection: "sessions",
});

const mongoSession = () => {
    return session({
        secret: sessionSecret,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
            secure: sessionSecure,
        },
        store: store,
        resave: false,
        saveUninitialized: false,
        name: "robinson",
    });
};

module.exports = mongoSession;
