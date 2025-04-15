import "@testing-library/jest-dom";

export default {
    testEnvironment: "jest-environment-jsdom",
    setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
    moduleNameMapper: {
        "\\.(gif|ttf|eot|svg|png)$": "<rootDir>/test/__mocks__/fileMock.js",
        "\\.(css|less|sass|scss)$": "identity-obj-proxy",
        "^@utils/(.*)$": "<rootDir>/src/utils/$1",
        "^@cards/(.*)$": "<rootDir>/src/cards/$1"
        },
};
