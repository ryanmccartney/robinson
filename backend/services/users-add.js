"use strict";

const logger = require("@utils/logger")(module);
const usersModel = require("@models/users");
const crypto = require("crypto");

module.exports = async (newUser) => {
    try {
        newUser.password = crypto
            .createHash("md5")
            .update(newUser.password)
            .digest("hex");

        const user = new usersModel(newUser);
        await user.save();
        logger.info(
            `Add user with name '${user.firstName} ${user.lastName}' and ID ${user.userId}`
        );

        if (user.password) {
            user.password = undefined;
        }
        return { user: user };
    } catch (error) {
        logger.warn(error);
        return { errors: error };
    }
};
