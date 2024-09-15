"use strict";

const logger = require("@utils/logger")(module);
const librariesModel = require("@models/libraries");

module.exports = async (newLibrary) => {
    try {
        const library = new librariesModel(newLibrary);
        await library.save();
        logger.info(
            `Add library with name '${library.name}' and ID ${library.libraryId}`
        );

        return { library: library };
    } catch (error) {
        logger.warn(error);
        return { errors: error };
    }
};
