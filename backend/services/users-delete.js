"use strict";

const logger = require("@utils/logger")(module);
const usersModel = require("@models/users");

module.exports = async (userId) => {
    try {
        if (userId) {
            const users = await usersModel.findOneAndDelete({ userId: userId });
            if (users) {
                logger.info(`Deleted user with name '${users.firstName} ${users.lastName}' and ID ${userId}`);
            } else {
                logger.info(`No user with ID ${userId}`);
            }
            return { data: users };
        } else {
            throw "No user ID provided";
        }
    } catch (error) {
        logger.warn(error);
        return { errors: error };
    }
};
