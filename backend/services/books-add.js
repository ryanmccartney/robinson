"use strict";

const logger = require("@utils/logger")(module);
const booksModel = require("@models/books");
const isbn = require("isbn3");
const getError = require("@utils/error-get");
const coverColor = require("@utils/cover-color");

module.exports = async (newBook) => {
    try {
        // bookId/dateAdded are server-generated identity fields - Mongoose's
        // `immutable` only blocks changes on save, not on initial creation,
        // so a client-supplied value here would otherwise be accepted as-is.
        delete newBook.bookId;
        delete newBook.dateAdded;

        if (newBook.isbn) {
            const isbnParsed = isbn.parse(newBook.isbn);
            if (isbnParsed) {
                newBook.isbn = isbnParsed.isbn13;
            } else {
                newBook.isbn = undefined;
                logger.error(
                    `ISBN Invalid: ${newBook.isbn} could not be parsed`
                );
            }
        }

        if (newBook.cover) {
            newBook.coverColors = await coverColor(newBook.cover);
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
