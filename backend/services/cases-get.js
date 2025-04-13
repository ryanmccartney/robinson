"use strict";

const logger = require("@utils/logger")(module);
const casesModel = require("@models/cases");
const shelvesModel = require("@models/shelves");
const booksModel = require("@models/books");

const getBooksOnShelf = async (shelfId) => {
    const newShelf = { shelfId };

    const booksObject = await booksModel.find(
        { shelfId },
        { bookId: 1, _id: 0 }
    );

    newShelf.books = booksObject.map((obj) => obj.bookId);
    return newShelf;
};

const getShelvesinCase = async (bookcase) => {
    const newCase = bookcase._doc;

    const shelvesObject = await shelvesModel.find(
        { caseId: bookcase.caseId },
        { shelfId: 1, _id: 0 }
    );

    newCase.shelves = shelvesObject.map((obj) => obj.shelfId);
    newCase.shelves = await Promise.all(
        newCase.shelves.map(async (shelf) => {
            return await getBooksOnShelf(shelf);
        })
    );

    return newCase;
};

module.exports = async (caseId) => {
    try {
        const data = {};
        if (caseId) {
            data.case =
                (await casesModel.findOne({ caseId: caseId }).lean()) || null;
            data.case.shelves =
                (await shelvesModel.find({ caseId: caseId }).lean()) || null;
            if (data.case.shelves) {
                for (const i in data.case.shelves) {
                    data.case.shelves[i].books =
                        (await booksModel.find({
                            shelfId: data.case.shelves[i].shelfId,
                        })) || null;
                }
            }
        } else {
            data.cases = await casesModel.find();

            data.cases = await Promise.all(
                data.cases.map(async (bookcase) => {
                    return await getShelvesinCase(bookcase);
                })
            );
        }

        return data;
    } catch (error) {
        logger.warn(error);
        return { errors: error };
    }
};
