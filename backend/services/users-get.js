"use strict";

const logger = require("@utils/logger")(module);
const usersModel = require("@models/users");

module.exports = async (userId) => {
    try {
        let data = {};
        if (userId) {
            data.user = await usersModel.findOne({ userId: userId });
        } else {
            data.users = await usersModel.find();
        }
        return data;
    } catch (error) {
        logger.warn(error);
        return { errors: error };
    }
};
