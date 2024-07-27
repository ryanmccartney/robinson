const mongoose = require("@utils/mongoose");
const id = require("@utils/id");

const schema = mongoose.Schema({
    userId: { type: String, default: () => id(), index: { unique: true }, immutable: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    password: { type: String, required: true },
    libraries: { type: Array },
});

module.exports = mongoose.model("users", schema);
