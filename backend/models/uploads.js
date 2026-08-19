const multer = require("multer");
const { GridFSBucket } = require("mongodb");
const mongoose = require("mongoose");

const bucket = new GridFSBucket(mongoose.connection, {
    bucketName: "uploads",
});

// Generous headroom for a real epub (rarely more than a few tens of MB
// even with embedded images/fonts) while bounding the worst case - multer
// previously had no limit at all, so an authenticated upload could buffer
// an arbitrarily large file fully in memory before it reached GridFS.
const MAX_UPLOAD_SIZE_BYTES = 100 * 1024 * 1024; // 100 MB

module.exports = multer({
    limits: { fileSize: MAX_UPLOAD_SIZE_BYTES },
});
module.exports.bucket = bucket;
