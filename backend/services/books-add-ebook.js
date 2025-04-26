"use strict";

const getError = require("@utils/error-get");
const booksModel = require("@models/books");
const uploadsModel = require("@models/uploads");
const { finished } = require("stream/promises");

module.exports = async (bookId, userId, file) => {
    try {
        const uploadStream = uploadsModel.bucket.openUploadStream(
            file.originalname,
            {
                metadata: {
                    uploadedBy: userId ? userId : "anonymous",
                },
            }
        );

        uploadStream.end(file.buffer);

        await finished(uploadStream);

        const update = {
            ebook: {
                fieldname: file?.fieldname,
                originalname: file?.originalname,
                encoding: file?.encoding,
                mimetype: file?.mimetype,
            },
        };

        const data = await booksModel.findOneAndUpdate(
            { bookId: bookId },
            { ...update, ...{ lastUpdated: new Date() } },
            { new: true, lean: true }
        );

        return {
            book: data,
        };
    } catch (error) {
        return getError(error);
    }
};
