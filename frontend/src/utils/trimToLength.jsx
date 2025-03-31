const trimToLength = (str, max = 25) => {
    if (!str) {
        return "";
    }

    const words = str.split(" ");
    let shortStr = "";

    if (!str || words.length < max) {
        return str;
    }

    for (const i in words) {
        if (i > max) {
            break;
        }
        shortStr += ` ${words[i]}`;
    }

    shortStr += "...";

    return shortStr.trim();
};

export default trimToLength;
