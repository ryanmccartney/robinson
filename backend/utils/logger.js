"use strict";

const winston = require("winston");
const path = require("path");
require("winston-daily-rotate-file");

const logFolder = process.env.LOG_FOLDER || "logs";
const logName = process.env.LOG_NAME || "robinson";
const logLevel = process.env.LOG_LEVEL || "info";

const customLevels = {
    levels: {
        error: 0,
        warn: 1,
        info: 2,
        http: 3,
        debug: 4,
    },
    colors: {
        error: "red",
        warn: "yellow",
        info: "blue",
        http: "magenta",
        debug: "gray",
    },
};

const customLogFormat = winston.format.combine(
    winston.format.errors({ stack: true }),
    winston.format.timestamp(),
    winston.format.splat(),
    winston.format.printf((log) => `${log.timestamp} ${log.level}: ${log.message}`)
);

winston.addColors(customLevels.colors);

const loggerInstance = winston.createLogger({
    levels: customLevels.levels,
    handleExceptions: false,
    transports: [
        new winston.transports.DailyRotateFile({
            level: logLevel,
            format: customLogFormat,
            filename: path.join(logFolder, logName + "-%DATE%.log"),
            datePattern: "YYYY-MM-DD",
            zippedArchive: true,
            maxSize: "100m",
            maxFiles: "1d",
        }),
        new winston.transports.Console({
            level: logLevel,
            handleExceptions: true,
            colorize: true,
            format: winston.format.combine(customLogFormat, winston.format.colorize({ all: true })),
        }),
    ],
});

const logger = (module) => {
    const filename = path.basename(module.filename);
    const loggers = {};

    for (const level in customLevels.levels) {
        loggers[level] = (message, metadata) => {
            loggerInstance[level](message, { metadata: { ...{ filename: filename }, ...metadata } });
        };
    }

    return loggers;
};

module.exports = logger;
