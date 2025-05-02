"use strict";

const getError = require("@utils/error-get");
const booksModel = require("@models/books");
const shelvesModel = require("@models/shelves");
const casesModel = require("@models/cases");
const preferences = require("@models/preferences");

module.exports = async (bookId, userId, filter = {}) => {
    try {
        const data = {};
        if (bookId) {
            const book = await booksModel.findOne(
                { bookId: bookId },
                { _id: 0, __v: 0 }
            );
            data.book = book ? book.toObject() : undefined;

            if (book) {
                const shelf = await shelvesModel.findOne(
                    { shelfId: data.book?.shelfId },
                    { _id: 0, __v: 0 }
                );
                data.book.shelf = shelf ? shelf.toObject() : undefined;

                const bookcase = await casesModel.findOne(
                    { caseId: data.book.shelf?.caseId },
                    { _id: 0, __v: 0 }
                );

                data.book.case = bookcase ? bookcase.toObject() : undefined;

                if (userId) {
                    data.book = {
                        ...data.book,
                        ...(await preferences.findOne(userId, {
                            bookId: bookId,
                        })),
                    };
                }
            }
        } else {
            const books = await booksModel.find({}, { cover: 0 }).sort(filter);
            data.books = books ? books.map((book) => book.toObject()) : [];
        }
        return data;
    } catch (error) {
        return getError(error);
    }
};
