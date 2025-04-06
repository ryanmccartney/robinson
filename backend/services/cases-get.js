"use strict";

const logger = require("@utils/logger")(module);
const casesModel = require("@models/cases");
const shelvesModel = require("@models/shelves");
const booksModel = require("@models/books");

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
            data.cases = (await casesModel.find()) || null;
        }

        return data;
    } catch (error) {
        logger.warn(error);
        return { errors: error };
    }
};
