"use strict";

const router = require("express").Router();
const response = require("@utils/response");
const auth = require("@utils/auth");
const upload = require("@models/uploads");

const getBooks = require("@services/books-get");
const addBooks = require("@services/books-add");
const deleteBooks = require("@services/books-delete");
const updateBooks = require("@services/books-update");

const getBooksByCase = require("@services/books-get-by-case");
const getBooksByShelf = require("@services/books-get-by-shelf");
const getBooksOrphaned = require("@services/books-get-orphaned");
const getBooksFavourites = require("@services/books-get-favourite");
const getBooksProgress = require("@services/books-get-progress");
const getBooksNew = require("@services/books-get-new");

const getEbook = require("@services/books-get-ebook");
const addEbook = require("@services/books-add-ebook");

/**
 * @swagger
 * /books:
 *    get:
 *      summary: Get a list of all books
 *      tags: [books]
 *      parameters:
 *       - in: query
 *         name: pages
 *         schema:
 *           type: number
 *         required: false
 *         description: Filter by pages, set to -1 or 1 for ascending of descending
 *       - in: query
 *         name: progress
 *         schema:
 *           type: number
 *         required: false
 *         description: Filter by progress, set to -1 or 1 for ascending of descending
 *       - in: query
 *         name: title
 *         schema:
 *           type: number
 *         required: false
 *         description: Filter by title, set to -1 or 1 for ascending of descending
 *       - in: query
 *         name: rating
 *         schema:
 *           type: number
 *         required: false
 *         description: Filter by rating, set to -1 or 1 for ascending of descending
 *       - in: query
 *         name: author
 *         schema:
 *           type: number
 *         required: false
 *         description: Filter by author, set to -1 or 1 for ascending of descending
 *       - in: query
 *         name: favorites
 *         schema:
 *           type: number
 *         required: false
 *         description: Filter by favorites, set to -1 or 1 for ascending of descending
 *       - in: query
 *         name: shelfId
 *         schema:
 *           type: number
 *         required: false
 *         description: Filter by shelfId, set to -1 or 1 for ascending of descending
 *       - in: query
 *         name: lastUpdated
 *         schema:
 *           type: number
 *         required: false
 *         description: Filter by lastUpdated, set to -1 or 1 for ascending of descending
 *       - in: query
 *         name: order
 *         schema:
 *           type: number
 *         required: false
 *         description: Filter by user set order, set to -1 or 1 for ascending of descending
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
router.get("/", auth.restrict(["get_data"]), async (req, res) => {
    const data = await getBooks(null, null, req.query);
    response(res, req, data);
});

/**
 * @swagger
 * /books/orphaned:
 *    get:
 *      summary: Get a list of all books that don't have a shelf (Orphaned)
 *      tags: [books]
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
router.get("/orphaned", auth.restrict(["get_data"]), async (req, res) => {
    const data = await getBooksOrphaned();
    response(res, req, data);
});

/**
 * @swagger
 * /books/favourites:
 *    get:
 *      summary: Get a list of all books that have been favourite'd
 *      tags: [books]
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
router.get("/favourites", auth.restrict(["get_data"]), async (req, res) => {
    const data = await getBooksFavourites(req.user);
    response(res, req, data);
});

/**
 * @swagger
 * /books/progress:
 *    get:
 *      summary: Get a list of all books that have been started (have progress)
 *      tags: [books]
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
router.get("/progress", auth.restrict(["get_data"]), async (req, res) => {
    const data = await getBooksProgress(req.user);
    response(res, req, data);
});

/**
 * @swagger
 * /books/new:
 *    get:
 *      summary: Get a list of all books in order of newest
 *      tags: [books]
 *      requestBody:
 *        required: false
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                records:
 *                  type: number
 *                  description: Number of records to return
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
router.get("/new", auth.restrict(["get_data"]), async (req, res) => {
    const data = await getBooksNew(req.body?.records);
    response(res, req, data);
});

/**
 * @swagger
 * /books/case/{caseId}:
 *    get:
 *      summary: Get a list of all books in a case
 *      tags: [books]
 *      parameters:
 *        - in: path
 *          name: caseId
 *          schema:
 *            type: string
 *          required: true
 *          description: The case ID string
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
router.get("/case/:caseId", auth.restrict(["get_data"]), async (req, res) => {
    const data = await getBooksByCase(req.params.caseId);
    response(res, req, data);
});

/**
 * @swagger
 * /books/shelf/{shelfId}:
 *    get:
 *      summary: Get a list of all books on a shelf
 *      tags: [books]
 *      parameters:
 *        - in: path
 *          name: shelfId
 *          schema:
 *            type: string
 *          required: true
 *          description: The shelf ID string
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
router.get("/shelf/:shelfId", auth.restrict(["get_data"]), async (req, res) => {
    const data = await getBooksByShelf(req.params.shelfId);
    response(res, req, data);
});

/**
 * @swagger
 * /books/cover/{bookId}:
 *    get:
 *      summary: Get a book cover by it's ID
 *      tags: [books]
 *      parameters:
 *        - in: path
 *          name: bookId
 *          schema:
 *            type: string
 *          required: true
 *          description: The book ID string
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
router.get("/cover/:bookId", auth.restrict(["get_data"]), async (req, res) => {
    const data = await getBooks(req.params.bookId);

    if (data?.book?.cover && typeof data?.book?.cover == "string") {
        const image = Buffer.from(data?.book?.cover, "base64");
        res.writeHead(200, {
            "Content-Type": "image/png",
            "Content-Length": image.length,
        });
        res.end(image);
    } else {
        response(res, req, {
            error: { message: "Unable to retrieve cover" },
            status: "error",
        });
    }
});

/**
 * @swagger
 * /books:
 *    post:
 *      summary: Add a new book
 *      tags: [books]
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
router.post("/", auth.restrict(["add_data"]), async (req, res) => {
    const data = await addBooks(req.body);
    response(res, req, data);
});

/**
 * @swagger
 * /books/{bookId}:
 *    get:
 *      summary: Get a book by it's ID
 *      tags: [books]
 *      parameters:
 *        - in: path
 *          name: bookId
 *          schema:
 *            type: string
 *          required: true
 *          description: The book ID string
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
router.get("/:bookId", auth.restrict(["get_data"]), async (req, res) => {
    const data = await getBooks(req.params.bookId, req.user);
    response(res, req, data);
});

/**
 * @swagger
 * /books/{bookId}:
 *    put:
 *      summary: Update a book by it's ID
 *      tags: [books]
 *      parameters:
 *        - in: path
 *          name: bookId
 *          schema:
 *            type: string
 *          required: true
 *          description: The book ID string
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
router.put("/:bookId", auth.restrict(["update_data"]), async (req, res) => {
    const data = await updateBooks(req.params.bookId, req.body, req.user);
    response(res, req, data);
});

/**
 * @swagger
 * /books/{bookId}:
 *    delete:
 *      summary: Delete a book by it's ID
 *      tags: [books]
 *      parameters:
 *        - in: path
 *          name: bookId
 *          schema:
 *            type: string
 *          required: true
 *          description: The book ID string
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
router.delete("/:bookId", auth.restrict(["delete_data"]), async (req, res) => {
    const data = await deleteBooks(req.params.bookId);
    response(res, req, data);
});

/**
 * @swagger
 * /books/ebook/{bookId}:
 *    post:
 *      summary: Upload an ebook
 *      tags: [books]
 *      parameters:
 *        - in: path
 *          name: bookId
 *          schema:
 *            type: string
 *          required: true
 *          description: The book ID string
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
router.post(
    "/ebook/:bookId",
    auth.restrict(["update_data"]),
    upload.single("ebook"),
    async (req, res) => {
        const data = await addEbook(req.params.bookId, req.user, req.file);
        response(res, req, data);
    }
);

/**
 * @swagger
 * /books/ebook/{bookId}.epub:
 *    get:
 *      summary: Download an ebook
 *      tags: [books]
 *      parameters:
 *        - in: path
 *          name: bookId
 *          schema:
 *            type: string
 *          required: true
 *          description: The book ID string followed by .epub
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
router.get("/ebook/:bookId", auth.restrict(["get_data"]), async (req, res) => {
    const data = await getEbook(req.params.bookId);

    if (data.filename) {
        res.set("Content-Type", data.contentType);
        res.set("Content-Disposition", `attachment; filename=${data.filename}`);
        data.downloadStream.pipe(res);
    } else {
        response(res, req, data);
    }
});

module.exports = router;
