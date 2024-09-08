"use strict";

const logger = require("@utils/logger")(module);
const getError = require("@utils/error-get");

const booksModel = require("@models/books");
const shelvesModel = require("@models/shelves");
const casesModel = require("@models/cases");

module.exports = async (query, fields = ["books", "author", "title", "description"]) => {
    try {
        let data = { results: [] };
        if (query) {

            if (fields.includes("books")) {
                if (fields.includes("title")) {
                    data.results = data.results.concat(await booksModel.find({ title: { $regex: query } }));
                }
                if (fields.includes("author")) {
                    data.results = data.results.concat(await booksModel.find({ author: { $regex: query } }));
                }
                if (fields.includes("description")) {
                    data.results = data.results.concat(await booksModel.find({ description: { $regex: query } }));
                }
            }

        }
        return data;


    } catch (error) {
        return getError(error);
    }
};
