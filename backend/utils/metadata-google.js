"use strict";

const logger = require("@utils/logger")(module);
const getImage = require("@utils/image-get");

module.exports = async (isbn) => {
    let data = {};
    let parsedData = {};

    try {
        if (isbn) {
            const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`);
            data = await response.json();
        }

        const book = data?.items[0];

        logger.info(`Google books API request for ${isbn}`);
        logger.debug(JSON.stringify(book, undefined, 4));

        parsedData = {
            author: book?.volumeInfo?.authors[0],
            title: book?.volumeInfo?.title,
            subtitle: book?.volumeInfo?.subtitle,
            publisher: book?.volumeInfo?.publisher,
            publishDate: book?.volumeInfo?.publishedDate,
            description: book?.volumeInfo?.description,
            pages: book?.volumeInfo?.pageCount,
            cover: await getImage(book?.volumeInfo?.imageLinks?.thumbnail),
            isbn: book?.volumeInfo?.industryIdentifiers[1]?.identifier,
        };
    } catch (error) {
        logger.warn(`Google books API request for ${isbn} failed`);
        logger.debug(error);
    }

    return parsedData;
};
