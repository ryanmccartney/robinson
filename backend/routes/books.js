"use strict";

const router = require("express").Router();
const hashResponse = require("@utils/hash-response");

const getBooks = require("@services/books-get");
const addBooks = require("@services/books-add");
const deleteBooks = require("@services/books-delete");

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

/**
 * @swagger
 * /books:
 *    post:
 *      description: Add a new book
 *      tags: [books]
 *      produces:
 *        - application/json
 *      responses:
 *        '200':
 *          description: Success
 */
router.post("/", async (req, res, next) => {
    const response = await addBooks(req.body);

    hashResponse(res, req, { ...response, ...{ status: response.errors ? "error" : "success" } });
});

/**
 * @swagger
 * /books/{booksId}:
 *    get:
 *      description: Get a book by it's ID
 *      tags: [books]
 *      parameters:
 *        - in: path
 *          name: booksId
 *          schema:
 *            type: string
 *          required: true
 *          description: The book ID string
 *      produces:
 *         - application/json
 *      responses:
 *         '200':
 *           description: Success
 */
router.get("/:bookId", async (req, res, next) => {
    const response = await getBooks(req.params.bookId);

    hashResponse(res, req, { ...response, ...{ status: response.errors ? "error" : "success" } });
});

/**
 * @swagger
 * /books/{booksId}:
 *    delete:
 *      description: Delete a book by it's ID
 *      tags: [books]
 *      parameters:
 *        - in: path
 *          name: booksId
 *          schema:
 *            type: string
 *          required: true
 *          description: The book ID string
 *      produces:
 *         - application/json
 *      responses:
 *         '200':
 *           description: Success
 */
router.delete("/:bookId", async (req, res, next) => {
    const response = await deleteBooks(req.params.bookId);
    hashResponse(res, req, { ...response, ...{ status: response.errors ? "error" : "success" } });
});

module.exports = router;
