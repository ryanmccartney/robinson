const router = require("express").Router();
const response = require("@utils/response");
const getUsersCurrent = require("@services/users-get-current");

/**
 * @swagger
 * /logout:
 *   post:
 *     description: Clears any session cookies to log a user out.
 *     tags: [auth]
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Successfully logged the user out.
 *         schema:
 *           type: object
 */
router.post("/", async (req, res) => {
    const data = await getUsersCurrent(req?.user);
    try {
        req.logout((err) => {
            if (err) {
                throw err;
            }
            data.message = `Successfully logged out ${data?.user?.firstName} ${data?.user?.lastName}`;
            response(res, req, data);
        });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
