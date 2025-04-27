"use strict";

const usersModel = require("@models/users");
const getError = require("@utils/error-get");

module.exports = async (userId) => {
    try {
        if (userId) {
            const user = await usersModel.findOne(
                { userId: userId },
                { password: 0, _id: 0, __v: 0 }
            );
            return { user: user };
        } else {
            throw new Error("No user logged in");
        }
    } catch (error) {
        return getError(error, 401);
    }
};
