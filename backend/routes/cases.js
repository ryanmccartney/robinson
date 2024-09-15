"use strict";

const router = require("express").Router();
const response = require("@utils/response");
const auth = require("@utils/auth");

const getCases = require("@services/cases-get");
const addCases = require("@services/cases-add");
const deleteCases = require("@services/cases-delete");
const updateCases = require("@services/cases-update");

/**
 * @swagger
 * /cases:
 *    get:
 *      summary: Get a list of all cases
 *      tags: [cases]
 *      responses:
 *         '200':
 *           description: Success
 *         '500':
 *           description: Error
 *         '401':
 *           description: Unauthorized
 *         '403':
 *           description: Forbidden
 *         '405':
 *           description: Incorrect request data
 */
router.get("/", auth.restrict(["get_data"]), async (req, res, next) => {
    const data = await getCases();
    response(res, req, data);
});

/**
 * @swagger
 * /cases:
 *    post:
 *      summary: Add a new case
 *      tags: [cases]
 *      responses:
 *         '200':
 *           description: Success
 *         '500':
 *           description: Error
 *         '401':
 *           description: Unauthorized
 *         '403':
 *           description: Forbidden
 *         '405':
 *           description: Incorrect request data
 */
router.post("/", auth.restrict(["add_data"]), async (req, res, next) => {
    const data = await addCases(req.body);
    response(res, req, data);
});

/**
 * @swagger
 * /cases/{casesId}:
 *    get:
 *      summary: Get a case by it's ID
 *      tags: [cases]
 *      parameters:
 *        - in: path
 *          name: casesId
 *          schema:
 *            type: string
 *          required: true
 *          description: The case ID string
 *      responses:
 *         '200':
 *           description: Success
 *         '500':
 *           description: Error
 *         '401':
 *           description: Unauthorized
 *         '403':
 *           description: Forbidden
 *         '405':
 *           description: Incorrect request data
 */
router.get("/:caseId", auth.restrict(["get_data"]), async (req, res, next) => {
    const data = await getCases(req.params.caseId);
    response(res, req, data);
});

/**
 * @swagger
 * /cases/{caseId}:
 *    put:
 *      summary: Update a case by it's ID
 *      tags: [cases]
 *      parameters:
 *        - in: path
 *          name: caseId
 *          schema:
 *            type: string
 *          required: true
 *          description: The case ID string
 *      responses:
 *         '200':
 *           description: Success
 *         '500':
 *           description: Error
 *         '401':
 *           description: Unauthorized
 *         '403':
 *           description: Forbidden
 *         '405':
 *           description: Incorrect request data
 */
router.put(
    "/:caseId",
    auth.restrict(["update_data"]),
    async (req, res, next) => {
        const data = await updateCases(req.params.caseId, req.body);
        response(res, req, data);
    }
);

/**
 * @swagger
 * /cases/{casesId}:
 *    delete:
 *      summary: Delete a case by it's ID
 *      tags: [cases]
 *      parameters:
 *        - in: path
 *          name: casesId
 *          schema:
 *            type: string
 *          required: true
 *          description: The case ID string
 *      responses:
 *         '200':
 *           description: Success
 *         '500':
 *           description: Error
 *         '401':
 *           description: Unauthorized
 *         '403':
 *           description: Forbidden
 *         '405':
 *           description: Incorrect request data
 */
router.delete(
    "/:caseId",
    auth.restrict(["delete_data"]),
    async (req, res, next) => {
        const data = await deleteCases(req.params.caseId);
        response(res, req, data);
    }
);

module.exports = router;
