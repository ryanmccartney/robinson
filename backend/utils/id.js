"use strict";

const { customAlphabet } = require("nanoid");

module.exports = (length = 8) => {
    const nanoid = customAlphabet(
        "1234567890abcdefghijklmnopqrstuvwxyz",
        length
    );
    return nanoid();
};
