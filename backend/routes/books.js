"use strict";

const router = require("express").Router();
const hashResponse = require("@utils/hash-response");

const getBooks = require("@services/books-get");
const addBooks = require("@services/books-add");
const deleteBooks = require("@services/books-delete");
const updateBooks = require("@services/books-update");

const getBooksByCase = require("@services/books-get-by-case");
const getBooksByShelf = require("@services/books-get-by-shelf");
const getBooksOrphaned = require("@services/books-get-orphaned");

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
 * /books/orphaned:
 *    get:
 *      description: Get a list of all books that don't have a shelf (Orphaned)
 *      tags: [books]
 *      produces:
 *        - application/json
 *      responses:
 *        '200':
 *          description: Success
 */
router.get("/orphaned", async (req, res, next) => {
    const response = await getBooksOrphaned();
    hashResponse(res, req, { ...response, ...{ status: response.errors ? "error" : "success" } });
});

/**
 * @swagger
 * /books/case/{caseId}:
 *    get:
 *      description: Get a list of all books in a case
 *      tags: [books]
 *      parameters:
 *        - in: path
 *          name: caseId
 *          schema:
 *            type: string
 *          required: true
 *          description: The case ID string
 *      produces:
 *        - application/json
 *      responses:
 *        '200':
 *          description: Success
 */
router.get("/case/:caseId", async (req, res, next) => {
    const response = await getBooksByCase(req.params.caseId);
    hashResponse(res, req, { ...response, ...{ status: response.errors ? "error" : "success" } });
});

/**
 * @swagger
 * /books/shelf/{caseId}:
 *    get:
 *      description: Get a list of all books on a shelf
 *      tags: [books]
 *      parameters:
 *        - in: path
 *          name: shelfId
 *          schema:
 *            type: string
 *          required: true
 *          description: The shelf ID string
 *      produces:
 *        - application/json
 *      responses:
 *        '200':
 *          description: Success
 */
router.get("/shelf/:shelfId", async (req, res, next) => {
    const response = await getBooksByShelf(req.params.shelfId);
    hashResponse(res, req, { ...response, ...{ status: response.errors ? "error" : "success" } });
});

/**
 * @swagger
 * /books/cover/{bookId}:
 *    get:
 *      description: Get a book cover by it's ID
 *      tags: [books]
 *      parameters:
 *        - in: path
 *          name: bookId
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
router.get("/cover/:bookId", async (req, res, next) => {
    const response = await getBooks(req.params.bookId);

    if (response.books.cover && typeof response.books.cover == "string") {
        const image = Buffer.from(response.books.cover, "base64");
        res.writeHead(200, {
            "Content-Type": "image/png",
            "Content-Length": image.length,
        });
        res.end(image);
    } else {
        hashResponse(res, req, { error: { message: "Unable to retrieve cover" }, status: "error" });
    }
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
 * /books/{bookId}:
 *    get:
 *      description: Get a book by it's ID
 *      tags: [books]
 *      parameters:
 *        - in: path
 *          name: bookId
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
 * /books/{bookId}:
 *    put:
 *      description: Update a book by it's ID
 *      tags: [books]
 *      parameters:
 *        - in: path
 *          name: bookId
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
router.put("/:bookId", async (req, res, next) => {
    const response = await updateBooks(req.params.bookId, req.body);
    hashResponse(res, req, { ...response, ...{ status: response.errors ? "error" : "success" } });
});

/**
 * @swagger
 * /books/{bookId}:
 *    delete:
 *      description: Delete a book by it's ID
 *      tags: [books]
 *      parameters:
 *        - in: path
 *          name: bookId
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
