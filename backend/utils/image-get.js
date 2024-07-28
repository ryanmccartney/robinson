"use strict";

const logger = require("@utils/logger")(module);

module.exports = async (url) => {
    let imageString = "";

    if (url) {
        try {
            const response = await fetch(url);

            const blob = await response.blob();
            const buffer = Buffer.from(await blob.arrayBuffer());

            imageString = await buffer.toString("base64");
        } catch (error) {
            logger.warn(`Failed to download ${url} as base64 string`);
            logger.error(error);
        }
    }
    return imageString;
};
