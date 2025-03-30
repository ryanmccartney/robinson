"use strict";

const logger = require("@utils/logger")(module);
const getError = require("@utils/error-get");
const booksModel = require("@models/books");

module.exports = async (isbn) => {
    try {
        const data = {};
        if (isbn) {
            data.book =
                (await booksModel.findOne({ isbn: isbn }))?.toJSON() ||
                undefined;
        }
        return data;
    } catch (error) {
        return getError(error);
    }
};
