const mongoose = require("@utils/mongoose");
const id = require("@utils/id");

const schema = mongoose.Schema({
    name: { type: String, required: true },
    shelfId: { type: String, default: () => id(), index: { unique: true } },
    caseId: { type: String },
    length: { type: Number },
    order: { type: Number, required: true, default: 0 },
});

module.exports = mongoose.model("shelves", schema);
