"use strict";

const logger = require("@utils/logger")(module);
const booksModel = require("@models/books");

module.exports = async (bookId) => {
    try {
        let books = {};
        if (bookId) {
            books = await booksModel.findOne({ bookId: bookId });
        } else {
            books = await booksModel.find();
        }
        return { data: books };
    } catch (error) {
        logger.warn(error);
        return { errors: error };
    }
};
