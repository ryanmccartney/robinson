"use strict";

const router = require("express").Router();
const hashResponse = require("@utils/hash-response");

const getMetadata = require("@services/metadata-get");
const updateMetadata = require("@services/metadata-update");
const addMetadata = require("@services/metadata-add");

/**
 * @swagger
 * /metadata/{isbn}:
 *    get:
 *      description: Get a list of all available metadata
 *      tags: [metadata]
 *      parameters:
 *        - in: path
 *          name: isbn
 *          schema:
 *            type: string
 *          required: true
 *          description: ISBN of the book, should convert between any format
 *      produces:
 *        - application/json
 *      responses:
 *        '200':
 *          description: Success
 */
router.get("/:isbn", async (req, res, next) => {
    const response = await getMetadata(req.params.isbn);

    hashResponse(res, req, { ...response, ...{ status: response.errors ? "error" : "success" } });
});

/**
 * @swagger
 * /metadata/{bookId}:
 *    put:
 *      description: Get a list of all available metadata and update existing records for an existing book
 *      tags: [metadata]
 *      parameters:
 *        - in: path
 *          name: bookId
 *          schema:
 *            type: string
 *          required: true
 *          description: Book ID as a string
 *      produces:
 *        - application/json
 *      responses:
 *        '200':
 *          description: Success
 */
router.put("/:bookId", async (req, res, next) => {
    const response = await updateMetadata(req.params.bookId);
    hashResponse(res, req, { ...response, ...{ status: response.errors ? "error" : "success" } });
});

/**
 * @swagger
 * /metadata/{isbn}:
 *    post:
 *      description: Get a list of all available metadata and create a book with it
 *      tags: [metadata]
 *      parameters:
 *        - in: path
 *          name: isbn
 *          schema:
 *            type: string
 *          required: true
 *          description: ISBN of the book, should convert between any format
 *      produces:
 *        - application/json
 *      responses:
 *        '200':
 *          description: Success
 */
router.post("/:isbn", async (req, res, next) => {
    const response = await addMetadata(req.params.isbn);
    hashResponse(res, req, { ...response, ...{ status: response.errors ? "error" : "success" } });
});

module.exports = router;
