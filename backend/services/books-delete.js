"use strict";

const logger = require("@utils/logger")(module);
const booksModel = require("@models/books");

module.exports = async (bookId) => {
    try {
        if (bookId) {
            const books = await booksModel.findOneAndDelete({ bookId: bookId });
            if (books) {
                logger.info(`Deleted book with title '${books.title}' and ID ${bookId}`);
            } else {
                logger.info(`No book with ID ${bookId}`);
            }
            return { data: books };
        } else {
            throw "No book ID provided";
        }
    } catch (error) {
        logger.warn(error);
        return { errors: error };
    }
};
