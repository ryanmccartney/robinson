"use strict";

const logger = require("@utils/logger")(module);
const booksModel = require("@models/books");

module.exports = async () => {
    try {
        let data = {};
        data.books = await booksModel.find({ progress: { $gt: 0 } });
        data.books = data.books.sort((a, b) => {
            return new Date(b.lastUpdated) - new Date(a.lastUpdated);
        });
        return data;
    } catch (error) {
        logger.warn(error);
        return { errors: error };
    }
};
