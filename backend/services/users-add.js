"use strict";

const logger = require("@utils/logger")(module);
const usersModel = require("@models/users");
const bcrypt = require("bcryptjs");

const BCRYPT_COST_FACTOR = 12;

module.exports = async (newUser) => {
    try {
        newUser.password = bcrypt.hashSync(newUser.password, BCRYPT_COST_FACTOR);

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
