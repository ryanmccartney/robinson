"use strict";

const logger = require("@utils/logger")(module);
const isNewerVersion = require("@utils/version-compare");
const packageJson = require("../package.json");

const CURRENT_VERSION = packageJson.version;
const GITHUB_REPO = "ryanmccartney/robinson";

module.exports = async () => {
    try {
        const response = await fetch(
            `https://api.github.com/repos/${GITHUB_REPO}/releases/latest`,
            {
                headers: {
                    Accept: "application/vnd.github+json",
                },
            }
        );

        if (!response.ok) {
            throw new Error(
                `GitHub API returned ${response.status}: ${response.statusText}`
            );
        }

        const release = await response.json();
        const latest = release.tag_name.replace(/^v/, "");

        const data = {
            current: CURRENT_VERSION,
            latest,
            updateAvailable: isNewerVersion(latest, CURRENT_VERSION),
        };

        return { version: data };
    } catch (error) {
        logger.warn(error);

        return {
            errors: error,
        };
    }
};
