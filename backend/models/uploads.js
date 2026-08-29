const multer = require("multer");
const { GridFSBucket } = require("mongodb");
const mongoose = require("mongoose");

const bucket = new GridFSBucket(mongoose.connection, {
    bucketName: "uploads",
});

const MAX_UPLOAD_SIZE_BYTES = 100 * 1024 * 1024; // 100 MB

module.exports = multer({
    limits: { fileSize: MAX_UPLOAD_SIZE_BYTES },
});
module.exports.bucket = bucket;
