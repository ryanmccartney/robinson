"use strict";

const logger = require("@utils/logger")(module);
const shelvesModel = require("@models/shelves");

module.exports = async (shelfId) => {
    try {
        if (shelfId) {
            const shelf = await shelvesModel.findOneAndDelete({ shelfId: shelfId });
            if (shelf) {
                logger.info(`Deleted shelf with title '${shelf.name}' and ID ${shelfId}`);
            } else {
                logger.info(`No shelf with ID ${shelfId}`);
            }
            return { data: shelf };
        } else {
            throw "No shelf ID provided";
        }
    } catch (error) {
        logger.warn(error);
        return { errors: error };
    }
};
