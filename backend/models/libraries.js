const mongoose = require("@utils/mongoose");
const id = require("@utils/id");

const schema = mongoose.Schema({
    name: { type: String, required: true },
    libraryId: { type: String, default: () => id(), index: { unique: true }, immutable: true },
    order: { type: Number, required: true, default: 0 },
});

module.exports = mongoose.model("libraries", schema);
