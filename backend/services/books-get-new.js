"use strict";

const logger = require("@utils/logger")(module);
const getError = require("@utils/error-get");
const booksModel = require("@models/books");

module.exports = async (records = 10) => {
    try {
        let data = {};
        data.books = await booksModel.find().sort({ dateAdded: -1 }).limit(records);

        return data;
    } catch (error) {
        return getError(error);
    }
};
