"use strict";

const logger = require("@utils/logger")(module);
const getError = require("@utils/error-get");
const booksModel = require("@models/books");
const shelvesModel = require("@models/shelves");
const casesModel = require("@models/cases");

module.exports = async (bookId, update) => {
    try {
        if (bookId) {
            const data = {};
            data.book = await booksModel.findOneAndUpdate(
                { bookId: bookId },
                { ...update, ...{ lastUpdated: new Date() } }
            );
            data.book = (await booksModel.findOne({ bookId: bookId })) || null;
            data.shelf = (await shelvesModel.findOne({ shelfId: data.book?.shelfId })) || null;
            data.case = (await casesModel.findOne({ caseId: data.shelf?.caseId })) || null;
            if (data.book) {
                logger.info(`Updated book with title '${data.book.title}' and ID ${bookId}`);
            } else {
                logger.info(`No book with ID ${bookId}`);
            }
            return data;
        } else {
            throw "No book ID provided";
        }
    } catch (error) {
        return getError(error);
    }
};
