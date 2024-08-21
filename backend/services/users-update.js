"use strict";

const logger = require("@utils/logger")(module);
const usersModel = require("@models/users");
const md5 = require("md5");

module.exports = async (userId, update) => {
    try {
        if (userId) {
            if (update.password) {
                update.password = md5(update.password);
            }
            const user = await usersModel.findOneAndUpdate({ userId: userId }, update);
            if (user) {
                logger.info(`Updated user with name '${user.firstName} ${user.lastName}' and ID ${userId}`);
            } else {
                logger.info(`No user with ID ${userId}`);
            }
            if (user.password) {
                user.password = undefined;
            }
            return { user: user };
        } else {
            throw "No user ID provided";
        }
    } catch (error) {
        logger.warn(error);
        return { errors: error };
    }
};
