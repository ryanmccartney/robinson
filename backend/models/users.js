const mongoose = require("@utils/mongoose");
const id = require("@utils/id");

const schema = mongoose.Schema({
    userId: { type: String, default: () => id(), index: { unique: true }, immutable: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    password: { type: String, required: true },
    username: { type: String, required: true },
    libraries: { type: Array },
    role: { type: String, enum: ["user", "guest", "admin"], required: true },
    enabled: { type: Boolean, required: true, default: true },
});

module.exports = mongoose.model("users", schema);
