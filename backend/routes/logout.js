const router = require("express").Router();
const response = require("@utils/response");
const getUsersCurrent = require("@services/users-get-current");

/**
 * @swagger
 * /logout:
 *   post:
 *     summary: Clears any session cookies to log a user out.
 *     tags: [auth]
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
    const data = await getUsersCurrent(req?.user);
    try {
        req.logout((err) => {
            if (err) {
                throw err;
            }
            req.session.destroy((err) => {
                if (err) {
                    throw err;
                }
                res.clearCookie("robinson");
                data.message = `Successfully logged out ${data?.user?.firstName} ${data?.user?.lastName}`;
                response(res, req, data);
            });
        });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
