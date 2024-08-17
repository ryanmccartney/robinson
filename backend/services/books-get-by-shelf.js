"use strict";

const logger = require("@utils/logger")(module);
const getError = require("@utils/error-get");
const booksModel = require("@models/books");
const shelvesModel = require("@models/shelves");

module.exports = async (shelfId) => {
    try {
        let books = [];

        const shelf = await shelvesModel.findOne({ shelfId: shelfId });

        if (shelfId && shelf) {
            books = await booksModel.find({ shelfId: shelfId });
        }
        return { shelf: shelf, books: books };
    } catch (error) {
        return getError(error);
    }
};
