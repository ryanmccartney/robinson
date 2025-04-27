const mongoose = require("@utils/mongoose");
const id = require("@utils/id");

const preferencesSchema = mongoose.Schema(
    {
        bookId: {
            type: String,
            index: { unique: true },
            immutable: true,
        },
        rating: { type: Number, min: 0, max: 5, default: 0 },
        favourite: { type: Boolean, default: false },
        progress: { type: Number, min: 0, default: 0 },
    },
    { _id: false }
);

const schema = mongoose.Schema({
    userId: {
        type: String,
        default: () => id(),
        index: { unique: true },
        immutable: true,
    },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    password: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: false },
    preferences: {
        type: [preferencesSchema],
        required: false,
        default: [],
    },
    role: {
        type: String,
        enum: ["member", "curator", "librarian"],
        required: true,
    },
    enabled: { type: Boolean, required: true, default: true },
});

module.exports = mongoose.model("users", schema);
