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
 *      description: Get a list of all shelves
 *      tags: [shelves]
 *      produces:
 *        - application/json
 *      responses:
 *        '200':
 *          description: Success
 */
router.get("/", auth.restrict(["get_data"]), async (req, res, next) => {
    const data = await getShelves();
    response(res, req, data);
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
router.post("/", auth.restrict(["add_data"]), async (req, res, next) => {
    const data = await addShelves(req.body);
    response(res, req, data);
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
router.get("/:shelfId", auth.restrict(["get_data"]), async (req, res, next) => {
    const data = await getShelves(req.params.shelfId);
    response(res, req, data);
});

/**
 * @swagger
 * /shelves/{shelfId}:
 *    put:
 *      description: Update a shelf by it's ID
 *      tags: [shelves]
 *      parameters:
 *        - in: path
 *          name: shelfId
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
router.put("/:shelfId", auth.restrict(["update_data"]), async (req, res, next) => {
    const data = await updateShelves(req.params.shelfId, req.body);
    response(res, req, data);
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
router.delete("/:shelfId", auth.restrict(["delete_data"]), async (req, res, next) => {
    const data = await deleteShelves(req.params.shelfId);
    response(res, req, data);
});

module.exports = router;
