"use strict";

const logger = require("@utils/logger")(module);
const booksModel = require("@models/books");
const isbn = require("isbn3");
const getError = require("@utils/error-get");

module.exports = async (newBook) => {
    try {
        if (newBook.isbn) {
            const isbnParsed = isbn.parse(newBook.isbn);
            if (isbnParsed) {
                newBook.isbn = isbnParsed.isbn13;
            } else {
                newBook.isbn = undefined;
            }
        }
        const book = new booksModel(newBook);
        await book.save();
        logger.info(
            `Add book with title '${book.title}' and ID ${book.bookId}`
        );

        return { book: book };
    } catch (error) {
        return getError(error);
    }
};
