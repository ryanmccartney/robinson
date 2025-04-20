"use strict";

const getError = require("@utils/error-get");
const booksModel = require("@models/books");
const shelvesModel = require("@models/shelves");
const casesModel = require("@models/cases");
const preferences = require("@utils/preferences");

module.exports = async (bookId, userId) => {
    try {
        const data = {};
        if (bookId) {
            data.book =
                (await booksModel
                    .findOne({ bookId: bookId }, { _id: 0, __v: 0 })
                    .lean()) || {};

            data.book.shelf =
                (await shelvesModel
                    .findOne(
                        { shelfId: data.book?.shelfId },
                        { _id: 0, __v: 0 }
                    )
                    .lean()) || null;

            data.book.case =
                (await casesModel
                    .findOne(
                        {
                            caseId: data.book.shelf?.caseId,
                        },
                        { _id: 0, __v: 0 }
                    )
                    .lean()) || null;

            if (userId) {
                data.book = {
                    ...data.book,
                    ...(await preferences.get(bookId, userId)),
                };
            }
        } else {
            data.books = await booksModel.find({}, { cover: 0 });
        }
        return data;
    } catch (error) {
        return getError(error);
    }
};
