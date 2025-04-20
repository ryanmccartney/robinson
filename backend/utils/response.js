"use strict";

const crypto = require("crypto");

module.exports = (res, req, contents) => {
    const data = contents;
    const meta = {
        hash: crypto.createHash("md5").update(JSON.stringify(data)).digest("hex"),
        request_url: `${req.protocol}://${req.hostname}${req.originalUrl}`,
        request_method: req.method,
        request_body: req.body,
        user: req.user,
    };

    data.status = contents.error ? "error" : "success";
    data.meta = meta;

    if (data?.error?.status) {
        res.statusCode = data?.error?.status || 500;
    }
    res.header("Content-Type", "application/json");
    res.json(data);
};
