let mongoose = require("mongoose");
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

const connect = async () => {
    try {
        await mongoose.connect(uri);
        logger.info(`Connected to database ${dbName}`);
    } catch (error) {
        logger.warn(error);
    }
};

connect();

module.exports = mongoose;
