export default {
    setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
    testEnvironment: "jest-environment-jsdom",
    moduleNameMapper: {
        "^@utils/(.*)$": "<rootDir>/src/utils/$1",
        "^@cards/(.*)$": "<rootDir>/src/cards/$1",
        "^@mock/(.*)$": "<rootDir>/src/mock/$1",
        "\\.(gif|ttf|eot|svg|png)$": "<rootDir>/test/__mocks__/fileMock.js",
        "\\.(css|less|sass|scss)$": "identity-obj-proxy",
    },
    transform: {
        "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
    },
};
