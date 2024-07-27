"use strict";

const router = require("express").Router();
const hashResponse = require("@utils/hash-response");

const getUsers = require("@services/users-get");
const addUsers = require("@services/users-add");
const deleteUsers = require("@services/users-delete");
const updateUsers = require("@services/users-update");

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

/**
 * @swagger
 * /users:
 *    post:
 *      description: Add a new user
 *      tags: [users]
 *      produces:
 *        - application/json
 *      responses:
 *        '200':
 *          description: Success
 */
router.post("/", async (req, res, next) => {
    const response = await addUsers(req.body);

    hashResponse(res, req, { ...response, ...{ status: response.errors ? "error" : "success" } });
});

/**
 * @swagger
 * /users/{usersId}:
 *    get:
 *      description: Get a user by it's ID
 *      tags: [users]
 *      parameters:
 *        - in: path
 *          name: usersId
 *          schema:
 *            type: string
 *          required: true
 *          description: The user ID string
 *      produces:
 *         - application/json
 *      responses:
 *         '200':
 *           description: Success
 */
router.get("/:userId", async (req, res, next) => {
    const response = await getUsers(req.params.userId);

    hashResponse(res, req, { ...response, ...{ status: response.errors ? "error" : "success" } });
});

/**
 * @swagger
 * /users/{userId}:
 *    put:
 *      description: Update a user by it's ID
 *      tags: [users]
 *      parameters:
 *        - in: path
 *          name: userId
 *          schema:
 *            type: string
 *          required: true
 *          description: The user ID string
 *      produces:
 *         - application/json
 *      responses:
 *         '200':
 *           description: Success
 */
router.put("/:userId", async (req, res, next) => {
    const response = await updateUsers(req.params.userId, req.body);
    hashResponse(res, req, { ...response, ...{ status: response.errors ? "error" : "success" } });
});

/**
 * @swagger
 * /users/{usersId}:
 *    delete:
 *      description: Delete a user by it's ID
 *      tags: [users]
 *      parameters:
 *        - in: path
 *          name: usersId
 *          schema:
 *            type: string
 *          required: true
 *          description: The user ID string
 *      produces:
 *         - application/json
 *      responses:
 *         '200':
 *           description: Success
 */
router.delete("/:userId", async (req, res, next) => {
    const response = await deleteUsers(req.params.userId);
    hashResponse(res, req, { ...response, ...{ status: response.errors ? "error" : "success" } });
});

module.exports = router;
