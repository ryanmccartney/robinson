const logger = require("@utils/logger")(module);
const nodeEnv = process.env.NODE_ENV || "production";

module.exports = (error, status = 500) => {
    logger.warn(error);
    return {
        error: {
            status: status,
            message: error.message,
            stack:
                nodeEnv !== "production" ? error.stack.split("\n") : undefined,
        },
    };
};
