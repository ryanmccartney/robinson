"use strict";

const getError = require("@utils/error-get");
const booksModel = require("@models/books");

module.exports = async (
    query,
    fields = ["books", "author", "title", "description"]
) => {
    try {
        const data = { results: [] };
        if (query) {
            if (fields.includes("books")) {
                if (fields.includes("title")) {
                    data.results = data.results.concat(
                        await booksModel.find(
                            { title: { $regex: query, $options : 'i' } },
                            { cover: 0 }
                        ).lean()
                    );
                }
                if (fields.includes("author")) {
                    data.results = data.results.concat(
                        await booksModel.find(
                            { author: { $regex: query , $options : 'i'} },
                            { cover: 0 }
                        ).lean()
                    );
                }
                if (fields.includes("description")) {
                    data.results = data.results.concat(
                        await booksModel.find(
                            {
                                description: { $regex: query, $options : 'i' },
                            },
                            { cover: 0 }
                        ).lean()
                    );
                }
            }
        }
        return data;
    } catch (error) {
        return getError(error);
    }
};
