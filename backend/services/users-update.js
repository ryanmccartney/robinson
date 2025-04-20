"use strict";

const logger = require("@utils/logger")(module);
const usersModel = require("@models/users");
const crypto = require("crypto");

module.exports = async (userId, update) => {
    try {
        if (userId) {
            if (update.password) {
                update.password = crypto
                    .createHash("md5")
                    .update(update.password)
                    .digest("hex");
            } else {
                delete update.password;
            }

            const user = await usersModel.findOneAndUpdate(
                { userId: userId },
                update
            );
            if (user) {
                logger.info(
                    `Updated user with name '${user.firstName} ${user.lastName}' and ID ${userId}`
                );
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
