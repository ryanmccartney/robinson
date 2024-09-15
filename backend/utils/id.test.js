const id = require("./id");

test("Check ID is of length 6", () => {
    expect(id(6)).toHaveLength(6);
});

test("Check ID is of length 8", () => {
    expect(id(8)).toHaveLength(8);
});
