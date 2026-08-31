module.exports = (latest = "", current = "") => {
    const latestParts = latest.split(".").map(Number);
    const currentParts = current.split(".").map(Number);

    for (let i = 0; i < 3; i++) {
        if ((latestParts[i] || 0) > (currentParts[i] || 0)) {
            return true;
        }

        if ((latestParts[i] || 0) < (currentParts[i] || 0)) {
            return false;
        }
    }

    return false;
};
