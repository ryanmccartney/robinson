"use strict";

const logger = require("@utils/logger")(module);
const usersModel = require("@models/users");

module.exports = async (newUser) => {
    try {
        const user = new usersModel(newUser);
        await user.save();
        logger.info(`Add user with name '${user.firstName} ${user.lastName}' and ID ${user.userId}`);

        return { data: user };
    } catch (error) {
        logger.warn(error);
        return { errors: error };
    }
};
