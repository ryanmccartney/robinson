"use strict";

const logger = require("@utils/logger")(module);
const usersModel = require("@models/users");
const md5 = require("md5");

module.exports = async (newUser) => {
    try {
        newUser.password = md5(newUser.password);
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
