"use strict";

const logger = require("@utils/logger")(module);
const getColors = require("get-image-colors");

// get-image-colors is only asked to decode formats it actually supports -
// anything else (or a non-image mime type claim entirely) is rejected
// before the buffer is handed to the decoding library.
const ALLOWED_COVER_MIME_TYPES = [
    "image/png",
    "image/jpeg",
    "image/jpg",
    "image/webp",
    "image/gif",
];

module.exports = async (imageString) => {
    try {
        if (imageString) {
            const mimeType = imageString
                .split(",")[0]
                .split(":")[1]
                .split(";")[0];

            if (!ALLOWED_COVER_MIME_TYPES.includes(mimeType)) {
                logger.warn(
                    `Refusing to process cover with unsupported mime type: ${mimeType}`
                );
                return [];
            }

            const buffer = Buffer.from(imageString.split(",")[1], "base64");

            let colors = await getColors(buffer, { type: mimeType, count: 2 });
            colors = colors.map((color) => color.hex());

            return colors;
        }
    } catch (error) {
        logger.warn(`Failed to find the modal color of the image`);
        logger.warn(error);
        return [];
    }
};
