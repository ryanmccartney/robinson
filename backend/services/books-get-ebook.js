"use strict";

const getError = require("@utils/error-get");
const uploads = require("@models/uploads");

module.exports = async (filename) => {
    try {
        const file = await uploads.bucket
            .find({ filename: filename })
            .toArray();

        if (file.length === 0) {
            throw new Error("Ebook not found");
        }

        const downloadStream = uploads.bucket.openDownloadStream(file[0]._id);

        return {
            filename: file[0].filename,
            contentType: file[0].contentType,
            downloadStream,
        };
    } catch (error) {
        return getError(error);
    }
};
