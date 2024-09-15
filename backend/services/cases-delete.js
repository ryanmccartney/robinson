"use strict";

const logger = require("@utils/logger")(module);
const casesModel = require("@models/cases");

module.exports = async (caseId) => {
    try {
        if (caseId) {
            const cases = await casesModel.findOneAndDelete({ caseId: caseId });
            if (cases) {
                logger.info(
                    `Deleted case with title '${cases.title}' and ID ${caseId}`
                );
            } else {
                logger.info(`No case with ID ${caseId}`);
            }
            return { case: cases };
        } else {
            throw "No case ID provided";
        }
    } catch (error) {
        logger.warn(error);
        return { errors: error };
    }
};
