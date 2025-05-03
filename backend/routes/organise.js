"use strict";

const router = require("express").Router();
const response = require("@utils/response");
const auth = require("@utils/auth");

const updateOrganise = require("@services/organise-update");

/**
 * @swagger
 * /organise/{field}:
 *    post:
 *      summary: Organise books by author
 *      tags: [organise]
 *      parameters:
 *        - in: path
 *          name: field
 *          schema:
 *            type: string
 *          required: true
 *          description: Book field to oganise books by
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
router.post("/:field", auth.restrict(["update_data"]), async (req, res) => {
    const data = await updateOrganise(req.params.field);
    response(res, req, data);
});

module.exports = router;
