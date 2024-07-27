"use strict";

const logger = require("@utils/logger")(module);
const librariesModel = require("@models/libraries");

module.exports = async (libraryId, update) => {
    try {
        if (libraryId) {
            const library = await librariesModel.findOneAndUpdate({ libraryId: libraryId }, update);
            if (library) {
                logger.info(`Updated library with name '${library.name}' and ID ${libraryId}`);
            } else {
                logger.info(`No library with ID ${libraryId}`);
            }
            return { library: library };
        } else {
            throw "No library ID provided";
        }
    } catch (error) {
        logger.warn(error);
        return { errors: error };
    }
};
