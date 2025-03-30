"use strict";

const logger = require("@utils/logger")(module);

const getMetadata = require("@services/metadata-get");
const updateBooks = require("@services/books-update");
const getBookByIsbn = require("@services/books-get-by-isbn");

module.exports = async (isbn) => {
    try {
        let data = await getBookByIsbn(isbn);
        const response = await getMetadata(data?.book?.isbn);

        if (response.metadata.combined) {
            data = await updateBooks(
                data?.book.bookId,
                response.metadata.combined
            );
        }

        return { metadata: response.metadata, book: data?.book };
    } catch (error) {
        logger.warn(error);
        return { errors: error };
    }
};
