"use strict";

const logger = require("@utils/logger")(module);
const usersModel = require("@models/users");

module.exports = async (userId) => {
    try {
        if (userId) {
            const user = await usersModel.findOneAndDelete({ userId: userId }, { password: 0 });
            if (user) {
                logger.info(`Deleted user with name '${user.firstName} ${user.lastName}' and ID ${userId}`);
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
