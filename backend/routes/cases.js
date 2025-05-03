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
 *      parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: number
 *         required: false
 *         description: Filter by name, set to -1 or 1 for ascending of descending
 *       - in: query
 *         name: order
 *         schema:
 *           type: number
 *         required: false
 *         description: Filter by order, set to -1 or 1 for ascending of descending
 *       - in: query
 *         name: lastUpdated
 *         schema:
 *           type: number
 *         required: false
 *         description: Filter by lastUpdated, set to -1 or 1 for ascending of descending
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
    const data = await getCases(null, req.query);
    response(res, req, data);
});

/**
 * @swagger
 * /cases:
 *    post:
 *      summary: Add a new case
 *      tags: [cases]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - name
 *              properties:
 *                name:
 *                  type: string
 *                  description: Name of case
 *                description:
 *                  type: string
 *                  description: Description of case
 *                libraryId:
 *                  type: string
 *                  description: Library the case belongs in
 *                order:
 *                  type: number
 *                  description: Display order of case
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
 * /cases/{caseId}:
 *    get:
 *      summary: Get a case by it's ID
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
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *                  description: Name of case
 *                description:
 *                  type: string
 *                  description: Description of case
 *                libraryId:
 *                  type: string
 *                  description: Library the case belongs in
 *                order:
 *                  type: number
 *                  description: Display order of case
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
 * /cases/{caseId}:
 *    delete:
 *      summary: Delete a case by it's ID
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
router.delete(
    "/:caseId",
    auth.restrict(["delete_data"]),
    async (req, res, next) => {
        const data = await deleteCases(req.params.caseId);
        response(res, req, data);
    }
);

module.exports = router;
