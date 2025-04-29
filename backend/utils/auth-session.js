"use strict";

const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const nodeEnv = process.env.NODE_ENV || "production";

const dbHost = process.env.DB_HOST || "mongo";
const dbName = process.env.DB_NAME || "robinson";
const dbPort = process.env.DB_PORT || 27017;
const dbUser = process.env.DB_USER || "robinson";
const dbPassword = process.env.DB_PASSWORD || "robinson123";

const uri = `mongodb://${dbUser}:${dbPassword.replace("@", "%40")}@${dbHost}:${dbPort}/${dbName}?authSource=admin`;
const sessionSecret = process.env.SESSION_SECRET || "sup3rs3cr3t";
const sessionSecure = Boolean(process.env.SESSION_SECURE) || false;

const store = new MongoDBStore({
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
