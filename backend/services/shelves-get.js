"use strict";

const logger = require("@utils/logger")(module);
const shelvesModel = require("@models/shelves");
const booksModel = require("@models/books");

const getShelf = async (shelf) => {
    let newShelf = shelf._doc;

    const booksObject = await booksModel.find({ shelfId: shelf.shelfId }, { bookId: 1, _id: 0 });
    newShelf.books = booksObject.map((obj) => obj.bookId);

    return newShelf;
};

module.exports = async (shelfId) => {
    try {
        let shelves = {};
        let newShelves = {};
        if (shelfId) {
            shelves = await shelvesModel.findOne({ shelfId: shelfId });
            newShelves = await getShelf(shelves);
        } else {
            shelves = await shelvesModel.find();

            newShelves = await Promise.all(
                shelves.map(async (shelf) => {
                    return await getShelf(shelf);
                })
            );
        }

        return { shelves: newShelves };
    } catch (error) {
        logger.warn(error);
        return { errors: error };
    }
};
