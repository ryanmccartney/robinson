"use strict";

const router = require("express").Router();
const response = require("@utils/response");
const auth = require("@utils/auth");

const getMetadata = require("@services/metadata-get");
const updateMetadata = require("@services/metadata-update");
const addMetadata = require("@services/metadata-add");

/**
 * @swagger
 * /metadata/{isbn}:
 *    get:
 *      summary: Get a list of all available metadata
 *      tags: [metadata]
 *      parameters:
 *        - in: path
 *          name: isbn
 *          schema:
 *            type: string
 *          required: true
 *          description: ISBN of the book, should convert between any format
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
router.get("/:isbn", auth.restrict(["get_data"]), async (req, res, next) => {
    const data = await getMetadata(req.params.isbn);
    response(res, req, data);
});

/**
 * @swagger
 * /metadata/{bookId}:
 *    put:
 *      summary: Get a list of all available metadata and update existing records for an existing book
 *      tags: [metadata]
 *      parameters:
 *        - in: path
 *          name: bookId
 *          schema:
 *            type: string
 *          required: true
 *          description: Book ID as a string
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
    "/:bookId",
    auth.restrict(["update_data"]),
    async (req, res, next) => {
        const data = await updateMetadata(req.params.bookId);
        response(res, req, data);
    }
);

/**
 * @swagger
 * /metadata/{isbn}:
 *    post:
 *      summary: Get a list of all available metadata and create a book with it
 *      tags: [metadata]
 *      parameters:
 *        - in: path
 *          name: isbn
 *          schema:
 *            type: string
 *          required: true
 *          description: ISBN of the book, should convert between any format
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
router.post("/:isbn", auth.restrict(["add_data"]), async (req, res, next) => {
    const data = await addMetadata(req.params.isbn);
    response(res, req, data);
});

module.exports = router;
