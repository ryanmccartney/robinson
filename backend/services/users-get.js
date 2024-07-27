"use strict";

const logger = require("@utils/logger")(module);
const usersModel = require("@models/users");

module.exports = async () => {
    try {
        const users = await usersModel.find();
        return { status: true, data: users };
    } catch (error) {
        logger.warn(error);
        return { status: true, error: error };
    }
};
