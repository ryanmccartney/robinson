"use strict";

const router = require("express").Router();
const response = require("@utils/response");
const auth = require("@utils/auth");

const getShelves = require("@services/shelves-get");
const addShelves = require("@services/shelves-add");
const deleteShelves = require("@services/shelves-delete");
const updateShelves = require("@services/shelves-update");

/**
 * @swagger
 * /shelves:
 *    get:
 *      summary: Get a list of all shelves
 *      tags: [shelves]
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
    const data = await getShelves();
    response(res, req, data);
});

/**
 * @swagger
 * /shelves:
 *    post:
 *      summary: Add a new shelf
 *      tags: [shelves]
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
    const data = await addShelves(req.body);
    response(res, req, data);
});

/**
 * @swagger
 * /shelves/{shelfId}:
 *    get:
 *      summary: Get a shelf by it's ID
 *      tags: [shelves]
 *      parameters:
 *        - in: path
 *          name: shelfId
 *          schema:
 *            type: string
 *          required: true
 *          description: The shelf ID string
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
router.get("/:shelfId", auth.restrict(["get_data"]), async (req, res, next) => {
    const data = await getShelves(req.params.shelfId);
    response(res, req, data);
});

/**
 * @swagger
 * /shelves/{shelfId}:
 *    put:
 *      summary: Update a shelf by it's ID
 *      tags: [shelves]
 *      parameters:
 *        - in: path
 *          name: shelfId
 *          schema:
 *            type: string
 *          required: true
 *          description: The shelf ID string
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
    "/:shelfId",
    auth.restrict(["update_data"]),
    async (req, res, next) => {
        const data = await updateShelves(req.params.shelfId, req.body);
        response(res, req, data);
    }
);

/**
 * @swagger
 * /shelves/{shelfId}:
 *    delete:
 *      summary: Delete a shelf by it's ID
 *      tags: [shelves]
 *      parameters:
 *        - in: path
 *          name: shelfId
 *          schema:
 *            type: string
 *          required: true
 *          description: The shelf ID string
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
    "/:shelfId",
    auth.restrict(["delete_data"]),
    async (req, res, next) => {
        const data = await deleteShelves(req.params.shelfId);
        response(res, req, data);
    }
);

module.exports = router;
