"use strict";

const router = require("express").Router();
const response = require("@utils/response");
const auth = require("@utils/auth");

const getUsers = require("@services/users-get");
const getUsersCurrent = require("@services/users-get-current");
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
router.get("/", auth.restrict(["get_user_data"]), async (req, res, next) => {
    const data = await getUsers();
    response(res, req, data);
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
router.post("/", auth.restrict(["add_user_data"]), async (req, res, next) => {
    const data = await addUsers(req.body);
    response(res, req, data);
});

/**
 * @swagger
 * /users/current:
 *    get:
 *      description: Get the current user
 *      tags: [users]
 *      produces:
 *        - application/json
 *      responses:
 *        '200':
 *          description: Success
 */
router.get("/current", async (req, res, next) => {
    const data = await getUsersCurrent(req.user);
    response(res, req, data);
});

/**
 * @swagger
 * /users/{usersId}:
 *    get:
 *      description: Get a user by their ID
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
router.get("/:userId", auth.restrict(["get_user_data"]), async (req, res, next) => {
    const data = await getUsers(req.params.userId);
    response(res, req, data);
});

/**
 * @swagger
 * /users/current:
 *    put:
 *      description: Update the current user
 *      tags: [users] 
 *      produces:
 *         - application/json
 *      responses:
 *         '200':
 *           description: Success
 */
router.put("/current", async (req, res, next) => {
    delete req.body?.roles
    delete req.body?.enabled
    delete req.body?.libraries
    const data = await updateUsers(req.user, req.body);
    response(res, req, data);
});

/**
 * @swagger
 * /users/{userId}:
 *    put:
 *      description: Update a user by their ID
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
router.put("/:userId", auth.restrict(["update_user_data"]), async (req, res, next) => {
    const data = await updateUsers(req.params.userId, req.body);
    response(res, req, data);
});

/**
 * @swagger
 * /users/{usersId}:
 *    delete:
 *      description: Delete a user by their ID
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
router.delete("/:userId", auth.restrict(["delete_user_data"]), async (req, res, next) => {
    const data = await deleteUsers(req.params.userId);
    response(res, req, data);
});

module.exports = router;
