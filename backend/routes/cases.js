"use strict";

const router = require("express").Router();
const hashResponse = require("@utils/hash-response");

const getCases = require("@services/cases-get");
const addCases = require("@services/cases-add");
const deleteCases = require("@services/cases-delete");

/**
 * @swagger
 * /cases:
 *    get:
 *      description: Get a list of all cases
 *      tags: [cases]
 *      produces:
 *        - application/json
 *      responses:
 *        '200':
 *          description: Success
 */
router.get("/", async (req, res, next) => {
    const response = await getCases();

    hashResponse(res, req, { ...response, ...{ status: response.errors ? "error" : "success" } });
});

/**
 * @swagger
 * /cases:
 *    post:
 *      description: Add a new case
 *      tags: [cases]
 *      produces:
 *        - application/json
 *      responses:
 *        '200':
 *          description: Success
 */
router.post("/", async (req, res, next) => {
    const response = await addCases(req.body);

    hashResponse(res, req, { ...response, ...{ status: response.errors ? "error" : "success" } });
});

/**
 * @swagger
 * /cases/{casesId}:
 *    get:
 *      description: Get a case by it's ID
 *      tags: [cases]
 *      parameters:
 *        - in: path
 *          name: casesId
 *          schema:
 *            type: string
 *          required: true
 *          description: The case ID string
 *      produces:
 *         - application/json
 *      responses:
 *         '200':
 *           description: Success
 */
router.get("/:caseId", async (req, res, next) => {
    const response = await getCases(req.params.caseId);

    hashResponse(res, req, { ...response, ...{ status: response.errors ? "error" : "success" } });
});

/**
 * @swagger
 * /cases/{casesId}:
 *    delete:
 *      description: Delete a case by it's ID
 *      tags: [cases]
 *      parameters:
 *        - in: path
 *          name: casesId
 *          schema:
 *            type: string
 *          required: true
 *          description: The case ID string
 *      produces:
 *         - application/json
 *      responses:
 *         '200':
 *           description: Success
 */
router.delete("/:caseId", async (req, res, next) => {
    const response = await deleteCases(req.params.caseId);
    hashResponse(res, req, { ...response, ...{ status: response.errors ? "error" : "success" } });
});

module.exports = router;
