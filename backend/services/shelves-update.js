"use strict";

const logger = require("@utils/logger")(module);
const shelvesModel = require("@models/shelves");

module.exports = async (shelfId, update) => {
    try {
        if (shelfId) {
            const shelf = await shelvesModel.findOneAndUpdate(
                { shelfId: shelfId },
                update
            );
            if (shelf) {
                logger.info(
                    `Updated shelf with name '${shelf.name}' and ID ${shelfId}`
                );
            } else {
                logger.info(`No shelf with ID ${shelfId}`);
            }
            return { shelf: shelf };
        } else {
            throw "No shelf ID provided";
        }
    } catch (error) {
        logger.warn(error);
        return { errors: error };
    }
};
