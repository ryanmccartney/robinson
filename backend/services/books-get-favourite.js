"use strict";

const logger = require("@utils/logger")(module);
const getError = require("@utils/error-get");
const booksModel = require("@models/books");

module.exports = async () => {
    try {
        const data = {};
        data.books = await booksModel.find({ favourite: true });
        data.books = data.books.sort((a, b) => {
            return new Date(b.lastUpdated) - new Date(a.lastUpdated);
        });
        return data;
    } catch (error) {
        return getError(error);
    }
};
