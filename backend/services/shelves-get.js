"use strict";

const logger = require("@utils/logger")(module);
const shelvesModel = require("@models/shelves");

module.exports = async (shelfId) => {
    try {
        let shelves = {};
        if (shelfId) {
            shelves = await shelvesModel.findOne({ shelfId: shelfId });
        } else {
            shelves = await shelvesModel.find();
        }
        return { data: shelves };
    } catch (error) {
        logger.warn(error);
        return { errors: error };
    }
};
