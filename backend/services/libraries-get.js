"use strict";

const logger = require("@utils/logger")(module);
const librariesModel = require("@models/libraries");

module.exports = async (libraryId) => {
    try {
        let libraries = {};
        if (libraryId) {
            libraries = await librariesModel.findOne({ libraryId: libraryId });
        } else {
            libraries = await librariesModel.find();
        }
        return { libraries: libraries };
    } catch (error) {
        logger.warn(error);
        return { errors: error };
    }
};
