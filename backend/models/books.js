const mongoose = require("@utils/mongoose");
const id = require("@utils/id");

const schema = mongoose.Schema({
    bookId: { type: String, default: () => id(), index: { unique: true }, immutable: true },
    shelfId: { type: String, required: true },
    title: { type: String, required: true },
    isbn: { type: Number, required: true },
    author: { type: String },
    description: { type: String },
    publishDate: { type: Date },
    publisher: { type: String },
    dateAdded: { type: Date, default: () => new Date(), index: { unique: true } },
    cover: { data: Buffer, contentType: String },
    pages: { type: Number, default: 0 },
    comments: [{ body: String, date: Date, user: String }],
    rating: { type: Number, default: 0 },
    progress: { type: Number, required: true, default: 0 },
    order: { type: Number, required: true, default: 0 },
});

module.exports = mongoose.model("books", schema);
