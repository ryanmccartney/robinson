"use strict";

const logger = require("@utils/logger")(module);
const usersModel = require("@models/users");
const passport = require("passport");

module.exports = async (userId) => {
    try {
        let data = {};
        if (userId) {
            data.user = await usersModel.findOne({ userId: userId }, { password: 0 });
        } else {
            data.users = await usersModel.find({}, { password: 0 });
        }
        return data;
    } catch (error) {
        logger.warn(error);
        return { errors: error };
    }
};
