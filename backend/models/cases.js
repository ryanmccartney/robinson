const mongoose = require("@utils/mongoose");
const id = require("@utils/id");

const schema = mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    caseId: {
        type: String,
        default: () => id(),
        index: { unique: true },
        immutable: true,
    },
    libraryId: { type: String },
    order: { type: Number, required: true, default: 0 },
    lastUpdated: { type: Date, type: Date, default: () => new Date() },
});

module.exports = mongoose.model("cases", schema);
