"use strict";

const logger = require("@utils/logger")(module);
const getError = require("@utils/error-get");
const casesModel = require("@models/cases");

module.exports = async (newCase) => {
    try {
        // caseId is a server-generated identity field - Mongoose's
        // `immutable` only blocks changes on save, not on initial creation.
        delete newCase.caseId;

        const cases = new casesModel(newCase);
        await cases.save();
        logger.info(
            `Add case with name '${cases.title}' and ID ${cases.caseId}`
        );

        return { case: cases };
    } catch (error) {
        return getError(error);
    }
};
