"use strict";

const logger = require("@utils/logger")(module);
const shelvesModel = require("@models/shelves");
const booksModel = require("@models/books");

const getBooksOnShelf = async (shelf) => {
    let newShelf = shelf._doc;

    const booksObject = await booksModel.find({ shelfId: shelf.shelfId }, { bookId: 1, _id: 0 });
    newShelf.books = booksObject.map((obj) => obj.bookId);

    return newShelf;
};

module.exports = async (shelfId) => {
    try {
        let data = {};

        if (shelfId) {
            data.shelf = await shelvesModel.findOne({ shelfId: shelfId });
            data.shelf = await getBooksOnShelf(data.shelf);
        } else {
            data.shelves = await shelvesModel.find();
            data.shelves = await Promise.all(
                data.shelves.map(async (shelf) => {
                    return await getBooksOnShelf(shelf);
                })
            );
        }

        return data;
    } catch (error) {
        logger.warn(error);
        return { errors: error };
    }
};
