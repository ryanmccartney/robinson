"use strict";

const logger = require("@utils/logger")(module);
const usersModel = require("@models/users");

module.exports = async (userId) => {
    try {
        const data = {};
        if (userId) {
            data.user = await usersModel.findOne(
                { userId: userId },
                { password: 0, _id: 0, __v: 0 }
            );
        } else {
            data.users = await usersModel.find({}, { password: 0 });
        }
        return data;
    } catch (error) {
        logger.warn(error);
        return { errors: error };
    }
};
