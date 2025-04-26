"use strict";

const getError = require("@utils/error-get");
const mongoose = require("mongoose");

module.exports = async (bookId) => {
    try {
        const db = mongoose.connection;

        const existingFiles = await db
            .collection("uploads.files")
            .find({ filename: `${bookId}.epub` })
            .toArray();

        if (existingFiles.length > 0) {
            const ids = existingFiles.map((file) => file._id);
            await db
                .collection("uploads.chunks")
                .deleteMany({ files_id: { $in: ids } });
            await db
                .collection("uploads.files")
                .deleteMany({ _id: { $in: ids } });
        }

        return { files: existingFiles };
    } catch (error) {
        return getError(error);
    }
};
