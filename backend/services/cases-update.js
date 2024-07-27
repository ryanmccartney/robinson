"use strict";

const logger = require("@utils/logger")(module);
const casesModel = require("@models/cases");

module.exports = async (caseId, update) => {
    try {
        if (caseId) {
            const bookcase = await casesModel.findOneAndUpdate({ caseId: caseId }, update);
            if (bookcase) {
                logger.info(`Updated case with name '${bookcase.name}' and ID ${caseId}`);
            } else {
                logger.info(`No case with ID ${caseId}`);
            }
            return { case: bookcase };
        } else {
            throw "No case ID provided";
        }
    } catch (error) {
        logger.warn(error);
        return { errors: error };
    }
};
