"use strict";

const getError = require("@utils/error-get");
const booksModel = require("@models/books");
const uploadsModel = require("@models/uploads");
const { finished } = require("stream/promises");
const deleteEbook = require("@services/books-delete-ebook");

module.exports = async (bookId, userId, file) => {
    try {
        if (bookId && file && file.mimetype === "application/epub+zip") {
            await deleteEbook(bookId);

            const uploadStream = uploadsModel.bucket.openUploadStream(
                `${bookId}.epub`,
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
        } else {
            throw new Error("Invalid eBook uploaded");
        }
    } catch (error) {
        return getError(error);
    }
};
