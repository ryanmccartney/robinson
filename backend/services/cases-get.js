"use strict";

const logger = require("@utils/logger")(module);
const casesModel = require("@models/cases");

module.exports = async (caseId) => {
    try {
        let cases = {};
        if (caseId) {
            cases = await casesModel.findOne({ caseId: caseId });
        } else {
            cases = await casesModel.find();
        }
        return { data: cases };
    } catch (error) {
        logger.warn(error);
        return { errors: error };
    }
};
