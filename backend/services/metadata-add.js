"use strict";

const logger = require("@utils/logger")(module);

const getMetadata = require("@services/metadata-get");
const addBooks = require("@services/books-add");

module.exports = async (isbn) => {
    try {
        const response = await getMetadata(isbn);

        // Every provider can legitimately come back empty for a very new or
        // very obscure ISBN. Adding the book anyway creates a record with no
        // title, which the schema then rejects -- so the user is shown a
        // validation error for what is really a "not found".
        if (!response?.metadata?.combined?.title) {
            logger.warn(
                `No metadata found for ${isbn}, not adding a book without a title`
            );
            return {
                metadata: response?.metadata,
                error: {
                    status: 404,
                    message: `No metadata could be found for ISBN ${isbn}`,
                },
            };
        }

        const data = await addBooks(response.metadata.combined);

        return { metadata: response.metadata, ...data };
    } catch (error) {
        logger.warn(error);
        return { errors: error };
    }
};
