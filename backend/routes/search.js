const router = require("express").Router();
const response = require("@utils/response");
const getSearch = require("@services/search-get");

/**
 * @swagger
 * /search:
 *   get:
 *     description: Search books, shelves, libraries, cases
 *     tags: [search]
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Successfully logged the user out.
 *         schema:
 *           type: object
 */
router.get("/", async (req, res) => {
    const data = await getSearch(req?.query?.query);
    response(res, req, data);

});

module.exports = router;
