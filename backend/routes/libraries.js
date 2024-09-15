"use strict";

const router = require("express").Router();
const response = require("@utils/response");
const auth = require("@utils/auth");

const getLibraries = require("@services/libraries-get");
const addLibraries = require("@services/libraries-add");
const deleteLibraries = require("@services/libraries-delete");
const updateLibraries = require("@services/libraries-update");

/**
 * @swagger
 * /libraries:
 *    get:
 *      summary: Get a list of all libraries
 *      tags: [libraries]
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
    const data = await getLibraries();
    response(res, req, data);
});

/**
 * @swagger
 * /libraries:
 *    post:
 *      summary: Add a new library
 *      tags: [libraries]
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
    const data = await addLibraries(req.body);
    response(res, req, data);
});

/**
 * @swagger
 * /libraries/{librariesId}:
 *    get:
 *      summary: Get a library by it's ID
 *      tags: [libraries]
 *      parameters:
 *        - in: path
 *          name: librariesId
 *          schema:
 *            type: string
 *          required: true
 *          description: The library ID string
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
router.get(
    "/:libraryId",
    auth.restrict(["get_data"]),
    async (req, res, next) => {
        const data = await getLibraries(req.params.libraryId);
        response(res, req, data);
    }
);

/**
 * @swagger
 * /libraries/{libraryId}:
 *    put:
 *      summary: Update a library by it's ID
 *      tags: [libraries]
 *      parameters:
 *        - in: path
 *          name: libraryId
 *          schema:
 *            type: string
 *          required: true
 *          description: The library ID string
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
    "/:libraryId",
    auth.restrict(["update_data"]),
    async (req, res, next) => {
        const data = await updateLibraries(req.params.libraryId, req.body);
        response(res, req, data);
    }
);

/**
 * @swagger
 * /libraries/{librariesId}:
 *    delete:
 *      summary: Delete a library by it's ID
 *      tags: [libraries]
 *      parameters:
 *        - in: path
 *          name: librariesId
 *          schema:
 *            type: string
 *          required: true
 *          description: The library ID string
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
    "/:libraryId",
    auth.restrict(["delete_data"]),
    async (req, res, next) => {
        const data = await deleteLibraries(req.params.libraryId);
        response(res, req, data);
    }
);

module.exports = router;
