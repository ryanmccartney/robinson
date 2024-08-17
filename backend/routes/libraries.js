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
 *      description: Get a list of all libraries
 *      tags: [libraries]
 *      produces:
 *        - application/json
 *      responses:
 *        '200':
 *          description: Success
 */
router.get("/", auth.restrict(["get_data"]), async (req, res, next) => {
    const data = await getLibraries();
    response(res, req, data);
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
router.post("/", auth.restrict(["add_data"]), async (req, res, next) => {
    const data = await addLibraries(req.body);
    response(res, req, data);
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
router.get("/:libraryId", auth.restrict(["get_data"]), async (req, res, next) => {
    const data = await getLibraries(req.params.libraryId);
    response(res, req, data);
});

/**
 * @swagger
 * /libraries/{libraryId}:
 *    put:
 *      description: Update a library by it's ID
 *      tags: [libraries]
 *      parameters:
 *        - in: path
 *          name: libraryId
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
router.put("/:libraryId", auth.restrict(["update_data"]), async (req, res, next) => {
    const data = await updateLibraries(req.params.libraryId, req.body);
    response(res, req, data);
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
router.delete("/:libraryId", auth.restrict(["delete_data"]), async (req, res, next) => {
    const data = await deleteLibraries(req.params.libraryId);
    response(res, req, data);
});

module.exports = router;
