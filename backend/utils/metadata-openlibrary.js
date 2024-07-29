"use strict";

const logger = require("@utils/logger")(module);
const getImage = require("@utils/image-get");

module.exports = async (isbn) => {
    let data = {};
    let parsedData = {};

    try {
        if (isbn) {
            const response = await fetch(`https://openlibrary.org/isbn/${isbn}.json`);
            data = await response.json();
        }

        logger.info(`Open library API request for ${isbn}`);
        logger.debug(JSON.stringify(data, undefined, 4));

        parsedData = {
            title: data?.title,
            publishData: data?.publish_date,
            isbn: data?.isbn_13[0],
            publisher: data?.publishers[0],
            description: data?.subtitle,
            subtitle: data?.subtitle,
            pages: parseInt(data?.pagination),
            cover: await getImage(data?.cover),
        };
    } catch (error) {
        logger.warn(`Open library API request for ${isbn} failed`);
        logger.debug(error);
    }

    return parsedData;
};
