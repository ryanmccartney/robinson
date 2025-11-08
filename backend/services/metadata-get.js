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
        if (data.google?.title || data.openlibrary?.title) {
            data.combined.isbn = isbn;
        } else if (data.openlibrary.isbn) {
            data.combined.isbn = data.openlibrary.isbn;
        } else {
            data.combined.isbn = data.google.isbn;
        }

        //Compare Covers
        if (data.google.cover) {
            data.combined.cover = data.google.cover;
        }
        if (
            data.openlibrary.cover &&
            data.combined.cover.length < data.openlibrary.cover.length
        ) {
            data.combined.cover = data.openlibrary.cover;
        }

        return { metadata: data };
    } catch (error) {
        logger.warn(error);
        return { errors: error };
    }
};
