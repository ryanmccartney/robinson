const router = require("express").Router();
const response = require("@utils/response");
const passport = require("passport");
const getUsers = require("@services/users-get");

/**
 * @swagger
 * /login:
 *   post:
 *     description: Creates a login session
 *     tags: [auth]
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: formData
 *         name: username
 *         type: string
 *         description: Username
 *         required: false
 *       - in: formData
 *         name: password
 *         type: string
 *         description: Password
 *         required: false
 *     responses:
 *       200:
 *         description: Successfully logged in user.
 *         schema:
 *           type: object
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
