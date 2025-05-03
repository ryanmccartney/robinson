"use strict";

const logger = require("@utils/logger")(module);

const booksModel = require("@models/books");
const shelvesModel = require("@models/shelves");
const casesModel = require("@models/cases");
const colorSort = require("@utils/color-sort");

module.exports = async (field, direction = "asc", dryRun = false) => {
    try {
        const data = { shelves: {} };

        let books = await booksModel
            .find({}, { cover: 0 })
            .sort({ [field]: direction === "asc" ? 1 : -1 });

        if (field === "color") {
            books = books.sort((a, b) => {
                return colorSort(a.coverColors[0], b.coverColors[0]);
            });
        }

        const cases = await casesModel.find().sort({ order: 1 });
        const shelves = await shelvesModel.find().sort({});

        const casesMap = new Map(
            cases.map((item, index) => [item.caseId, index])
        );
        shelves.sort((a, b) => casesMap.get(a.caseId) - casesMap.get(b.caseId));

        let currentBookIndex = 0;
        for (const shelf of shelves) {
            let shelfOccupation = 0;
            if (shelf?.length && currentBookIndex < books.length) {
                data.shelves[shelf?.shelfId] = [];
                for (let i = currentBookIndex; i < books.length; i++) {
                    shelfOccupation += books[i].width;
                    currentBookIndex = i;
                    if (shelfOccupation > shelf.length) {
                        break;
                    }
                    data.shelves[shelf?.shelfId].push(books[i].bookId);
                }
            }
        }

        if (!dryRun) {
            let order = 0;
            for (const [shelfId, bookIds] of Object.entries(data.shelves)) {
                for (const bookId of bookIds) {
                    await booksModel.findOneAndUpdate(
                        { bookId: bookId },
                        { shelfId: shelfId, order: order }
                    );
                    order += 1;
                }
            }
        }

        return { organise: data };
    } catch (error) {
        logger.warn(error);
        return { errors: error };
    }
};
