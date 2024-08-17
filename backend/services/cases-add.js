"use strict";

const logger = require("@utils/logger")(module);
const getError = require("@utils/error-get");
const casesModel = require("@models/cases");

module.exports = async (newCase) => {
    try {
        const cases = new casesModel(newCase);
        await cases.save();
        logger.info(`Add case with name '${cases.title}' and ID ${cases.caseId}`);

        return { case: cases };
    } catch (error) {
        return getError(error);
    }
};
