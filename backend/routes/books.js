"use strict";

const router = require("express").Router();
const hashResponse = require("@utils/hash-response");

const getBooks = require("@services/books-get");

/**
 * @swagger
 * /books:
 *    get:
 *      description: Get a list of all books
 *      tags: [books]
 *      produces:
 *        - application/json
 *      responses:
 *        '200':
 *          description: Success
 */
router.get("/", async (req, res, next) => {
    const response = await getBooks();

    hashResponse(res, req, { ...response, ...{ status: response.errors ? "error" : "success" } });
});

module.exports = router;
