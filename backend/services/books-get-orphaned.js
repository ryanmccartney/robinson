"use strict";

const logger = require("@utils/logger")(module);
const getError = require("@utils/error-get");
const booksModel = require("@models/books");
const shelvesModel = require("@models/shelves");

module.exports = async () => {
    try {
        let orphanedBooks = [];
        let shelvesId = [];

        const shelves = await shelvesModel.find();
        const books = await booksModel.find();

        for (let shelf of shelves) {
            shelvesId.push(shelf.shelfId);
        }

        for (let book of books) {
            console.log(book);
            if (shelvesId.includes(book.bookId)) {
                orphanedBooks.push(book);
            }
        }

        return { shelves: shelves, books: books };
    } catch (error) {
        return getError(error);
    }
};
