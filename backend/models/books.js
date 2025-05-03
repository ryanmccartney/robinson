const mongoose = require("@utils/mongoose");
const id = require("@utils/id");
const spineWidth = require("@utils/spine-width");

const userSchema = mongoose.Schema({
    bookId: {
        type: String,
        default: () => id(),
        index: true,
        unique: true,
        required: true,
        immutable: true,
    },
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
    coverColors: { type: Array },
    ebook: { type: Object },
    pages: { type: Number, default: 0 },
    hardback: { type: Boolean, default: false },
    comments: [{ body: String, date: Date, user: String }],
    lastUpdated: { type: Date, type: Date, default: () => new Date() },
    order: { type: Number, required: true, default: 0 },
});

userSchema.virtual("width").get(function () {
    return spineWidth(this.pages, this.hardback);
});

userSchema.set("toJSON", { virtuals: true });
userSchema.set("toObject", { virtuals: true });

module.exports = mongoose.model("books", userSchema);
