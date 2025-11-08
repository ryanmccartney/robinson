"use strict";

const logger = require("@utils/logger")(module);

const getMetadata = require("@services/metadata-get");
const addBooks = require("@services/books-add");

module.exports = async (isbn) => {
    try {
        let data = {};
        const response = await getMetadata(isbn);

        if (response.metadata.combined) {
            data = await addBooks(response.metadata.combined);
        }

        return { metadata: response.metadata, ...data };
    } catch (error) {
        logger.warn(error);
        return { errors: error };
    }
};
