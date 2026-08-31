"use strict";

const router = require("express").Router();
const response = require("@utils/response");
const auth = require("@utils/auth");

const getSystemVersion = require("@services/system-version-get");

/**
 * @swagger
 * /system/version:
 *    get:
 *      summary: Get system version
 *      tags: [system]
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
router.get("/version", auth.restrict(["get_data"]), async (req, res) => {
    const data = await getSystemVersion();
    response(res, req, data);
});

module.exports = router;
