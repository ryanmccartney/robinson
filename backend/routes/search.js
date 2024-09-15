const router = require("express").Router();
const response = require("@utils/response");
const getSearch = require("@services/search-get");

/**
 * @swagger
 * /search:
 *   get:
 *     summary: Search books, shelves, libraries, cases
 *     tags: [search]
 *     parameters:
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         required: true
 *         description: The query string to make a search against
 *     responses:
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
router.get("/", async (req, res) => {
    const data = await getSearch(req?.query?.query);
    response(res, req, data);
});

module.exports = router;
