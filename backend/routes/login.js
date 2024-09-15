const router = require("express").Router();
const response = require("@utils/response");
const passport = require("passport");
const getUsers = require("@services/users-get");

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Creates a login session
 *     tags: [auth]
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - username
 *                - password
 *              properties:
 *                username:
 *                  type: string
 *                  description: Username to login with
 *                password:
 *                  type: string
 *                  description: Password to try and login with
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
router.post("/", async (req, res, next) => {
    passport.authenticate("local", async (err, id, info) => {
        if (err) {
            return next(err);
        }
        if (!id) {
            return response(res, req, {
                status: "failure",
                message: "Login failed.",
                data: id,
            });
        }

        const data = await getUsers(id);

        req.logIn(id, (err) => {
            if (err) {
                return next(err);
            }
            return response(res, req, {
                status: data.user ? "success" : "failure",
                message: data.user
                    ? `Successfully logged in ${data.user.username}`
                    : "Login failed",
                user: data.user,
            });
        });
    })(req, res, next);
});

module.exports = router;
