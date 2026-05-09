"use strict";

const logger = require("@utils/logger")(module);
const getImage = require("@utils/image-get");
const fetchRetry = require("@utils/fetch-retry");

module.exports = async (isbn) => {
    let data = {};
    let parsedData = {};
    let chosenCover = "";

    try {
        if (isbn) {
            const response = await fetchRetry(
                `https://openlibrary.org/isbn/${isbn}.json`
            );
            if (!response.ok) {
                logger.warn(
                    `Open library API request for ${isbn} returned status ${response.status}`
                );
                return {};
            }
            data = await response.json();
        } else {
            logger.warn(`Open library API request no ISBN provided`);
            return {};
        }

        if (data?.covers) {
            for (const cover of data?.covers) {
                const coverData = await getImage(
                    `https://covers.openlibrary.org/a/id/${cover}-L.jpg`
                );
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
