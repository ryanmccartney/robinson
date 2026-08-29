const mongoose = require("mongoose");
const logger = require("@utils/logger")(module);

const dbHost = process.env.DB_HOST || "mongo";
const dbName = process.env.DB_NAME || "robinson";
const dbPort = process.env.DB_PORT || 27017;
const dbUser = process.env.DB_USER || "robinson";
const dbPassword = process.env.DB_PASSWORD || "robinson123";

const uri = `mongodb://${dbUser}:${dbPassword.replace("@", "%40")}@${dbHost}:${dbPort}/${dbName}?authSource=admin`;

// mongoose.set("useNewUrlParser", true);
// mongoose.set("useFindAndModify", false);
// mongoose.set("useCreateIndex", true);
// mongoose.set("useUnifiedTopology", true);

const INITIAL_RETRY_DELAY_MS = 2000;
const MAX_RETRY_DELAY_MS = 30000;

// mongoose.connect() rejecting used to only log a warning and give up,
// leaving the app permanently disconnected if the very first attempt lost
// a startup DNS race with the DB container. Retry with capped exponential
// backoff instead of giving up after one try.
const connect = async (retryDelay = INITIAL_RETRY_DELAY_MS) => {
    try {
        await mongoose.connect(uri);
        logger.info(`Connected to database ${dbName}`);
    } catch (error) {
        logger.warn(
            `Failed to connect to database ${dbName}, retrying in ${retryDelay}ms: ${error.message}`
        );
        setTimeout(
            () => connect(Math.min(retryDelay * 2, MAX_RETRY_DELAY_MS)),
            retryDelay
        );
    }
};

connect();

module.exports = mongoose;
module.exports.uri = uri;
