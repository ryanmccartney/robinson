"use strict";

const logger = require("@utils/logger")(module);
const getError = require("@utils/error-get");
const booksModel = require("@models/books");
const shelvesModel = require("@models/shelves");
const casesModel = require("@models/cases");

module.exports = async (bookId) => {
    try {
        const data = {};
        if (bookId) {
            data.book = (await booksModel.findOne({ bookId: bookId }))?.toJSON() || null;
            data.shelf = (await shelvesModel.findOne({ shelfId: data.book?.shelfId })) || null;
            data.case = (await casesModel.findOne({ caseId: data.shelf?.caseId })) || null;
        } else {
            data.books = await booksModel.find({}, { cover: 0 });
        }
        return data;
    } catch (error) {
        return getError(error);
    }
};
