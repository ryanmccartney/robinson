"use strict";

const logger = require("@utils/logger")(module);
const usersModel = require("@models/users");

module.exports = async (userId, update) => {
    try {
        if (userId) {
            const user = await usersModel.findOneAndUpdate({ userId: userId }, update);
            if (user) {
                logger.info(`Updated user with name '${user.firstName} ${user.lastName}' and ID ${userId}`);
            } else {
                logger.info(`No user with ID ${userId}`);
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
