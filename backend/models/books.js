const mongoose = require("@utils/mongoose");
const id = require("@utils/id");

const schema = mongoose.Schema({
    bookId: { type: String, default: () => id(), index: true, unique: true, required: true, immutable: true },
    shelfId: { type: String },
    title: { type: String, required: true },
    isbn: { type: Number, required: true, unique: true },
    author: { type: String },
    description: { type: String },
    subtitle: { type: String },
    publishDate: { type: Date },
    publisher: { type: String },
    dateAdded: { type: Date, default: () => new Date() },
    cover: { type: String },
    pages: { type: Number, default: 0 },
    comments: [{ body: String, date: Date, user: String }],
    rating: { type: Number, default: 0 },
    progress: { type: Number, required: true, default: 0 },
    order: { type: Number, required: true, default: 0 },
});

module.exports = mongoose.model("books", schema);
