"use strict";

const logger = require("@utils/logger")(module);
const getImage = require("@utils/image-get");
const imageGet = require("./image-get");

module.exports = async (isbn) => {
    let data = {};
    let parsedData = {};
    let chosenCover = "";

    try {
        if (isbn) {
            const response = await fetch(`https://openlibrary.org/isbn/${isbn}.json`);
            data = await response.json();
        }

        if (data?.covers) {
            for (let cover of data?.covers) {
                const coverData = await imageGet(`https://covers.openlibrary.org/a/id/${cover}-L.jpg`);
                if (coverData.length > chosenCover.length) {
                    chosenCover = coverData;
                }
            }
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
            cover: chosenCover,
        };
    } catch (error) {
        logger.warn(`Open library API request for ${isbn} failed`);
        logger.debug(error);
    }

    return parsedData;
};
