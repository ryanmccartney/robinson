"use strict";

const md5 = require("md5");

module.exports = (res, req, contents) => {
    const response = contents;
    const meta = {
        hash: md5(response),
        request_url: `${req.protocol}://${req.hostname}${req.originalUrl}`,
        request_method: req.method,
        request_body: req.body,
        user: req.user,
    };

    response.meta = meta;
    res.header("Content-Type", "application/json");
    res.json(response);
};
