"use strict";

const logger = require("@utils/logger")(module);

const getMetadata = require("@services/metadata-get");
const updateBooks = require("@services/books-update");
const getBooks = require("@services/books-get");

module.exports = async (bookId) => {
    try {
        let book = await getBooks(bookId);
        const response = await getMetadata(book?.isbn);

        if (response.metadata.combined) {
            book = await updateBooks(response.metadata.combined);
        }

        return { metadata: response.metadata, book: book };
    } catch (error) {
        logger.warn(error);
        return { errors: error };
    }
};
