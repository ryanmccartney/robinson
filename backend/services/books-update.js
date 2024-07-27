"use strict";

const logger = require("@utils/logger")(module);
const booksModel = require("@models/books");

module.exports = async (bookId, update) => {
    try {
        if (bookId) {
            const books = await booksModel.findOneAndUpdate({ bookId: bookId }, update);
            if (books) {
                logger.info(`Updated book with title '${books.title}' and ID ${bookId}`);
            } else {
                logger.info(`No book with ID ${bookId}`);
            }
            return { book: books };
        } else {
            throw "No book ID provided";
        }
    } catch (error) {
        logger.warn(error);
        return { errors: error };
    }
};
