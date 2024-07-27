"use strict";

const router = require("express").Router();
const hashResponse = require("@utils/hash-response");

const getUsers = require("@services/users-get");

/**
 * @swagger
 * /users:
 *    get:
 *      description: Get a list of all users
 *      tags: [users]
 *      produces:
 *        - application/json
 *      responses:
 *        '200':
 *          description: Success
 */
router.get("/", async (req, res, next) => {
    const response = await getUsers();

    hashResponse(res, req, { ...response, ...{ status: response.errors ? "error" : "success" } });
});

module.exports = router;
