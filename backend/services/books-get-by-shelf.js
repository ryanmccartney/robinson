"use strict";

const logger = require("@utils/logger")(module);
const booksModel = require("@models/books");

module.exports = async (shelfId) => {
    try {
        let books = [];
        if (shelfId) {
            books = await booksModel.find({ shelfId: shelfId });
        }
        return { books: books };
    } catch (error) {
        logger.warn(error);
        return { errors: error };
    }
};
