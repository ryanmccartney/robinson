"use strict";

const logger = require("@utils/logger")(module);
const getError = require("@utils/error-get");
const booksModel = require("@models/books");
const shelvesModel = require("@models/shelves");

module.exports = async () => {
    try {
        const orphanedBooks = [];
        const shelvesId = [];

        const shelves = await shelvesModel.find();
        const books = await booksModel.find();

        for (const shelf of shelves) {
            shelvesId.push(shelf.shelfId);
        }

        for (const book of books) {
            if (shelvesId.includes(book.bookId)) {
                orphanedBooks.push(book);
            }
        }

        return { shelves: shelves, books: books };
    } catch (error) {
        return getError(error);
    }
};
