"use strict";

const logger = require("@utils/logger")(module);
const librariesModel = require("@models/libraries");

module.exports = async (libraryId) => {
    try {
        if (libraryId) {
            const library = await librariesModel.findOneAndDelete({ libraryId: libraryId });
            if (library) {
                logger.info(`Deleted library with title '${library.name}' and ID ${libraryId}`);
            } else {
                logger.info(`No library with ID ${libraryId}`);
            }
            return { data: library };
        } else {
            throw "No library ID provided";
        }
    } catch (error) {
        logger.warn(error);
        return { errors: error };
    }
};
