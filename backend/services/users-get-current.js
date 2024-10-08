"use strict";

const logger = require("@utils/logger")(module);
const usersModel = require("@models/users");
const getError = require("@utils/error-get");

module.exports = async (userId) => {
    try {
        if (userId) {
            const user = await usersModel.findOne(
                { userId: userId },
                { password: 0 }
            );
            return { user: user };
        } else {
            throw new Error("No user");
        }
    } catch (error) {
        return getError(error);
    }
};
