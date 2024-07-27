"use strict";

const logger = require("@utils/logger")(module);
const booksModel = require("@models/books");

module.exports = async (newBook) => {
    try {
        const book = new booksModel(newBook);
        await book.save();
        logger.info(`Add book with title '${book.title}' and ID ${book.bookId}`);

        return { data: book };
    } catch (error) {
        logger.warn(error);
        return { errors: error };
    }
};
