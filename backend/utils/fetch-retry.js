const logger = require("@utils/logger")(module);

const fetchRetry = async (
    url,
    options = {},
    { retries = 3, retryDelay = 500 } = {}
) => {
    let lastError;

    for (let attempt = 0; attempt <= retries; attempt++) {
        let response;
        try {
            response = await fetch(url, options);
            logger.info(
                `Request attempt ${attempt + 1} for ${url} returned status ${response.status}`
            );
            if (response.status >= 500 && response.status < 600) {
                throw new Error(`Server error: ${response.status}`);
            }

            return response;
        } catch (err) {
            lastError = err;

            if (attempt >= retries) {
                return response;
            }

            await new Promise((resolve) => setTimeout(resolve, retryDelay));
        }
    }
};

module.exports = fetchRetry;
