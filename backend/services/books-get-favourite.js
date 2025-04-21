"use strict";

const getError = require("@utils/error-get");
const booksModel = require("@models/books");
const preferences = require("@models/preferences");

module.exports = async (userId) => {
    try {
        const data = {};

        const favouriteData = await preferences.findFavourites(userId);
        const bookIds = favouriteData.map((item) => item.bookId);

        data.books = await booksModel.find({ bookId: { $in: bookIds } }).lean();

        data.books = data.books.sort((a, b) => {
            return new Date(b.lastUpdated) - new Date(a.lastUpdated);
        });
        return data;
    } catch (error) {
        return getError(error);
    }
};
