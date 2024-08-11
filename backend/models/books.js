const mongoose = require("@utils/mongoose");
const id = require("@utils/id");

const schema = mongoose.Schema({
    bookId: { type: String, default: () => id(), index: true, unique: true, required: true, immutable: true },
    shelfId: { type: String },
    title: { type: String, required: true },
    isbn: { type: Number, unique: true },
    author: { type: String },
    description: { type: String },
    subtitle: { type: String },
    publishDate: { type: Date },
    publisher: { type: String },
    dateAdded: { type: Date, default: () => new Date(), immutable: true },
    cover: { type: String },
    pages: { type: Number, default: 0 },
    comments: [{ body: String, date: Date, user: String }],
    favourite: { type: Boolean, default: false },
    rating: { type: Number, min: 0, max: 5, default: 0 },
    progress: { type: Number, required: true, default: 0 },
    lastUpdated: { type: Date, type: Date, default: () => new Date() },
    order: { type: Number, required: true, default: 0 },
});

module.exports = mongoose.model("books", schema);
