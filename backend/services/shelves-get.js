"use strict";

const logger = require("@utils/logger")(module);
const shelvesModel = require("@models/shelves");
const booksModel = require("@models/books");
const casesModel = require("@models/cases");

const getBooksOnShelf = async (shelf) => {
    const newShelf = shelf._doc;

    const booksObject = await booksModel.find(
        { shelfId: shelf.shelfId },
        { bookId: 1, _id: 0 }
    );
    newShelf.books = booksObject.map((obj) => obj.bookId);

    return newShelf;
};

module.exports = async (shelfId) => {
    try {
        const data = {};

        if (shelfId) {
            const shelf = await shelvesModel.findOne({ shelfId: shelfId });
            data.shelf = shelf ? shelf.toObject() : {};

            const books = await booksModel.find({ shelfId: shelfId });
            data.shelf.books = books
                ? books.map((book) => book.toObject())
                : [];

            data.shelf.current = data.shelf.books.reduce(
                (accumulator, current) =>
                    accumulator + (isNaN(current.width) ? 0 : current.width),
                0
            );

            const bookcase = await booksModel.findOne({ shelfId: shelfId });
            data.shelf.case = bookcase ? bookcase.toObject() : null;
        } else {
            data.shelves = await shelvesModel.find();
            data.shelves = await Promise.all(
                data.shelves.map(async (shelf) => {
                    return await getBooksOnShelf(shelf);
                })
            );

            data.shelves = await Promise.all(
                data.shelves.map(async (shelf) => {
                    if (shelf.caseId) {
                        shelf.case = await casesModel.findOne({
                            caseId: shelf.caseId,
                        });
                    }
                    return shelf;
                })
            );
        }

        return data;
    } catch (error) {
        logger.warn(error);
        return { errors: error };
    }
};
