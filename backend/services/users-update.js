"use strict";

const logger = require("@utils/logger")(module);
const usersModel = require("@models/users");
const bcrypt = require("bcryptjs");

const BCRYPT_COST_FACTOR = 12;

module.exports = async (userId, update) => {
    try {
        if (userId) {
            if (update.password) {
                update.password = bcrypt.hashSync(
                    update.password,
                    BCRYPT_COST_FACTOR
                );
            } else {
                delete update.password;
            }

            const user = await usersModel.findOneAndUpdate(
                { userId: userId },
                update,
                { new: true, lean: true }
            );
            if (user) {
                logger.info(
                    `Updated user with name '${user.firstName} ${user.lastName}' and ID ${userId}`
                );
            } else {
                logger.info(`No user with ID ${userId}`);
            }
            if (user?.password) {
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
