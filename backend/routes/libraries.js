"use strict";

const router = require("express").Router();
const hashResponse = require("@utils/hash-response");

const getLibraries = require("@services/libraries-get");
const addLibraries = require("@services/libraries-add");
const deleteLibraries = require("@services/libraries-delete");

/**
 * @swagger
 * /libraries:
 *    get:
 *      description: Get a list of all libraries
 *      tags: [libraries]
 *      produces:
 *        - application/json
 *      responses:
 *        '200':
 *          description: Success
 */
router.get("/", async (req, res, next) => {
    const response = await getLibraries();

    hashResponse(res, req, { ...response, ...{ status: response.errors ? "error" : "success" } });
});

/**
 * @swagger
 * /libraries:
 *    post:
 *      description: Add a new library
 *      tags: [libraries]
 *      produces:
 *        - application/json
 *      responses:
 *        '200':
 *          description: Success
 */
router.post("/", async (req, res, next) => {
    const response = await addLibraries(req.body);

    hashResponse(res, req, { ...response, ...{ status: response.errors ? "error" : "success" } });
});

/**
 * @swagger
 * /libraries/{librariesId}:
 *    get:
 *      description: Get a library by it's ID
 *      tags: [libraries]
 *      parameters:
 *        - in: path
 *          name: librariesId
 *          schema:
 *            type: string
 *          required: true
 *          description: The library ID string
 *      produces:
 *         - application/json
 *      responses:
 *         '200':
 *           description: Success
 */
router.get("/:libraryId", async (req, res, next) => {
    const response = await getLibraries(req.params.libraryId);

    hashResponse(res, req, { ...response, ...{ status: response.errors ? "error" : "success" } });
});

/**
 * @swagger
 * /libraries/{librariesId}:
 *    delete:
 *      description: Delete a library by it's ID
 *      tags: [libraries]
 *      parameters:
 *        - in: path
 *          name: librariesId
 *          schema:
 *            type: string
 *          required: true
 *          description: The library ID string
 *      produces:
 *         - application/json
 *      responses:
 *         '200':
 *           description: Success
 */
router.delete("/:libraryId", async (req, res, next) => {
    const response = await deleteLibraries(req.params.libraryId);
    hashResponse(res, req, { ...response, ...{ status: response.errors ? "error" : "success" } });
});

module.exports = router;
