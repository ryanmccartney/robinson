"use strict";

const logger = require("@utils/logger")(module);
const booksModel = require("@models/books");
const shelvesModel = require("@models/shelves");
const casesModel = require("@models/cases");

module.exports = async (bookId) => {
    try {
        let books = {};
        if (bookId) {
            books = (await booksModel.findOne({ bookId: bookId }))?.toJSON() || {};
            books.shelf = (await shelvesModel.findOne({ shelfId: books?.shelfId })) || {};
            books.case = (await casesModel.findOne({ caseId: books?.shelf?.caseId })) || {};
        } else {
            books = await booksModel.find();
        }
        return { books: books };
    } catch (error) {
        logger.warn(error);
        return { errors: error };
    }
};
