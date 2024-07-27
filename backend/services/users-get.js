"use strict";

const logger = require("@utils/logger")(module);
const usersModel = require("@models/users");

module.exports = async (userId) => {
    try {
        let users = {};
        if (userId) {
            users = await usersModel.findOne({ userId: userId });
        } else {
            users = await usersModel.find();
        }
        return { data: users };
    } catch (error) {
        logger.warn(error);
        return { errors: error };
    }
};
