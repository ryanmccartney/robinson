"use strict";

const router = require("express").Router();
const hashResponse = require("@utils/hash-response");

const getShelves = require("@services/shelves-get");
const addShelves = require("@services/shelves-add");
const deleteShelves = require("@services/shelves-delete");

/**
 * @swagger
 * /shelves:
 *    get:
 *      description: Get a list of all shelves
 *      tags: [shelves]
 *      produces:
 *        - application/json
 *      responses:
 *        '200':
 *          description: Success
 */
router.get("/", async (req, res, next) => {
    const response = await getShelves();

    hashResponse(res, req, { ...response, ...{ status: response.errors ? "error" : "success" } });
});

/**
 * @swagger
 * /shelves:
 *    post:
 *      description: Add a new shelf
 *      tags: [shelves]
 *      produces:
 *        - application/json
 *      responses:
 *        '200':
 *          description: Success
 */
router.post("/", async (req, res, next) => {
    const response = await addShelves(req.body);

    hashResponse(res, req, { ...response, ...{ status: response.errors ? "error" : "success" } });
});

/**
 * @swagger
 * /shelves/{shelvesId}:
 *    get:
 *      description: Get a shelf by it's ID
 *      tags: [shelves]
 *      parameters:
 *        - in: path
 *          name: shelvesId
 *          schema:
 *            type: string
 *          required: true
 *          description: The shelf ID string
 *      produces:
 *         - application/json
 *      responses:
 *         '200':
 *           description: Success
 */
router.get("/:shelfId", async (req, res, next) => {
    const response = await getShelves(req.params.shelfId);

    hashResponse(res, req, { ...response, ...{ status: response.errors ? "error" : "success" } });
});

/**
 * @swagger
 * /shelves/{shelvesId}:
 *    delete:
 *      description: Delete a shelf by it's ID
 *      tags: [shelves]
 *      parameters:
 *        - in: path
 *          name: shelvesId
 *          schema:
 *            type: string
 *          required: true
 *          description: The shelf ID string
 *      produces:
 *         - application/json
 *      responses:
 *         '200':
 *           description: Success
 */
router.delete("/:shelfId", async (req, res, next) => {
    const response = await deleteShelves(req.params.shelfId);
    hashResponse(res, req, { ...response, ...{ status: response.errors ? "error" : "success" } });
});

module.exports = router;
