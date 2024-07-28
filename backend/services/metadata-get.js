"use strict";

const logger = require("@utils/logger")(module);

const googleMetadata = require("@utils/metadata-google");
const openlibraryMetadata = require("@utils/metadata-openlibrary");

module.exports = async (isbn) => {
    try {
        const data = {};

        data.google = await googleMetadata(isbn);
        data.openlibrary = await openlibraryMetadata(isbn);

        //Starting point for combining data
        data.combined = { ...data.openlibrary, ...data.google };

        //Compare page numbers
        if (data.google.pages && data.google.pages > 0) {
            data.combined.pages = data.google.pages;
        }
        if (data.openlibrary.pages && data.openlibrary.pages > 0) {
            data.combined.pages = data.openlibrary.pages;
        }

        //Compare ISBN
        if (data.google.isbn) {
            data.combined.isbn = data.google.isbn;
        } else if (data.openlibrary.isbn) {
            data.combined.isbn = data.openlibrary.isbn;
        } else if (data.openlibrary.title || data.openlibrary.title) {
            data.combined.isbn = isbn;
        }

        return { metadata: data };
    } catch (error) {
        logger.warn(error);
        return { errors: error };
    }
};
