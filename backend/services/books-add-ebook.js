"use strict";

const getError = require("@utils/error-get");
const booksModel = require("@models/books");
const uploadsModel = require("@models/uploads");
const { finished } = require("stream/promises");
const deleteEbook = require("@services/books-delete-ebook");
const epub = require("@utils/epub");

// All zip local file headers begin with this signature - checking it
// catches a renamed non-zip file before it reaches the zip parser, since
// the client-supplied mimetype/Content-Type alone is trivially spoofable.
const ZIP_MAGIC = Buffer.from([0x50, 0x4b]); // "PK"

module.exports = async (bookId, userId, file) => {
    try {
        if (
            bookId &&
            file &&
            file.mimetype === "application/epub+zip" &&
            file.buffer?.length >= 2 &&
            file.buffer.subarray(0, 2).equals(ZIP_MAGIC)
        ) {
            await deleteEbook(bookId);

            const metadata = await epub.metadata(file.buffer);

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
                    ...metadata,
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
