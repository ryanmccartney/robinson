"use strict";

const logger = require("@utils/logger")(module);
const casesModel = require("@models/cases");

module.exports = async (caseId) => {
    try {
        let data = {};
        if (caseId) {
            data.case = (await casesModel.findOne({ caseId: caseId })) || null;
        } else {
            data.cases = (await casesModel.find()) || null;
        }
        return data;
    } catch (error) {
        logger.warn(error);
        return { errors: error };
    }
};
