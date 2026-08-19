"use strict";

const getError = require("@utils/error-get");
const booksModel = require("@models/books");

// Escape regex metacharacters so a caller-supplied query can only ever
// match as a literal substring - prevents both malformed-pattern errors
// and catastrophic-backtracking (ReDoS) patterns from reaching $regex.
const escapeRegExp = (string) => string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

module.exports = async (
    query,
    fields = ["books", "author", "title", "description"]
) => {
    try {
        const data = { results: [] };
        if (query) {
            const safeQuery = escapeRegExp(query);
            if (fields.includes("books")) {
                if (fields.includes("title")) {
                    data.results = data.results.concat(
                        await booksModel.find(
                            { title: { $regex: safeQuery, $options: "i" } },
                            { cover: 0 }
                        )
                    );
                }
                if (fields.includes("author")) {
                    data.results = data.results.concat(
                        await booksModel.find(
                            { author: { $regex: safeQuery, $options: "i" } },
                            { cover: 0 }
                        )
                    );
                }
                if (fields.includes("description")) {
                    data.results = data.results.concat(
                        await booksModel.find(
                            {
                                description: {
                                    $regex: safeQuery,
                                    $options: "i",
                                },
                            },
                            { cover: 0 }
                        )
                    );
                }

                data.results = data.results.reduce((acc, current) => {
                    const x = acc.find(
                        (item) => item.bookId === current.bookId
                    );
                    if (!x) {
                        return acc.concat([current]);
                    } else {
                        return acc;
                    }
                }, []);
            }
        }
        return data;
    } catch (error) {
        return getError(error);
    }
};
