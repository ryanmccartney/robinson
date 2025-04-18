import "@testing-library/jest-dom";

if (typeof global.TextEncoder === "undefined") {
    const { TextEncoder, TextDecoder } = require("util");
    global.TextEncoder = TextEncoder;
    global.TextDecoder = TextDecoder;
}
