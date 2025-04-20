"use strict";

const logger = require("@utils/logger")(module);
const getError = require("@utils/error-get");
const preferences = require("@utils/preferences");
const booksModel = require("@models/books");
const shelvesModel = require("@models/shelves");
const casesModel = require("@models/cases");

module.exports = async (bookId, update = {}, userId) => {
    try {
        if (bookId) {
            const data = {};

            const book = await booksModel.findOneAndUpdate(
                { bookId: bookId },
                { ...update, ...{ lastUpdated: new Date() } },
                { new: true, lean: true }
            );

            data.book = {
                ...book,
                ...(await preferences.update(bookId, userId, update)),
            };

            data.shelf =
                (await shelvesModel
                    .findOne(
                        { shelfId: data.book?.shelfId },
                        { _id: 0, __v: 0 }
                    )
                    .lean()) || null;
            data.case =
                (await casesModel
                    .findOne({ caseId: data.shelf?.caseId }, { _id: 0, __v: 0 })
                    .lean()) || null;

            if (data.book) {
                logger.info(
                    `Updated book with title '${data.book.title}' and ID ${bookId}`
                );
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
