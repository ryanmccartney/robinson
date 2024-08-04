"use strict";

const logger = require("@utils/logger")(module);
const casesModel = require("@models/cases");
const shelvesModel = require("@models/shelves");
const booksModel = require("@models/books");

module.exports = async (caseId) => {
    try {
        let data = {};
        if (caseId) {
            data.case = (await casesModel.findOne({ caseId: caseId })) || null;
            data.shelves = (await shelvesModel.find({ caseId: caseId })) || null;
            if (data.shelves) {
                for (let i in data.shelves) {
                    data.shelves[i]._doc.books = (await booksModel.find({ shelfId: data.shelves[i].shelfId })) || null;
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
