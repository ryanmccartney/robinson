"use strict";

const logger = require("@utils/logger")(module);
const booksModel = require("@models/books");
const shelvesModel = require("@models/shelves");

module.exports = async (caseId) => {
    try {
        let books = [];
        let shelves = [];

        if (caseId) {
            shelves = await shelvesModel.find({ caseId: caseId });

            for (let shelf of shelves) {
                books = books.concat(await booksModel.find({ shelfId: shelf.shelfId }));
            }
        }
        return { shelves: shelves, books: books };
    } catch (error) {
        logger.warn(error);
        return { errors: error };
    }
};
