const multer = require("multer");
const { GridFSBucket } = require("mongodb");
const mongoose = require("mongoose");

const bucket = new GridFSBucket(mongoose.connection, {
    bucketName: "uploads",
});

module.exports = multer();
module.exports.bucket = bucket;
