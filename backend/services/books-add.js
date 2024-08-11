"use strict";

const logger = require("@utils/logger")(module);
const booksModel = require("@models/books");
const isbn = require("isbn3");
module.exports = async (newBook) => {
    try {
        if (newBook.isbn) {
            const isbnParsed = isbn.parse(newBook.isbn);
            if (isbnParsed.isIsbn10()) {
                newBook.isbn = isbnParsed.asIsbn13();
            }
            if (isbnParsed.isIsbn13()) {
                newBook.isbn = isbnParsed.asIsbn13();
            }
        }
        const book = new booksModel(newBook);
        await book.save();
        logger.info(`Add book with title '${book.title}' and ID ${book.bookId}`);

        return { book: book };
    } catch (error) {
        logger.warn(error);
        return { errors: error };
    }
};
