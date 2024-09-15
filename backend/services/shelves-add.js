"use strict";

const logger = require("@utils/logger")(module);
const shelvesModel = require("@models/shelves");

module.exports = async (newShelf) => {
    try {
        const shelf = new shelvesModel(newShelf);
        await shelf.save();
        logger.info(
            `Add shelf with name '${shelf.name}' and ID ${shelf.shelfId}`
        );

        return { shelf: shelf };
    } catch (error) {
        logger.warn(error);
        return { errors: error };
    }
};
