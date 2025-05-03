"use strict";

const logger = require("@utils/logger")(module);

function hexToHslArray(hex) {
    hex = hex.replace("#", "");

    let r = parseInt(hex.slice(0, 2), 16);
    let g = parseInt(hex.slice(2, 4), 16);
    let b = parseInt(hex.slice(4, 6), 16);

    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h,
        s,
        l = (max + min) / 2;

    if (max === min) {
        h = s = 0;
    } else {
        const delta = max - min;
        s = l > 0.5 ? delta / (2 - max - min) : delta / (max + min);
        switch (max) {
            case r:
                h = (g - b) / delta + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / delta + 2;
                break;
            case b:
                h = (r - g) / delta + 4;
                break;
        }
        h /= 6;
    }

    h = Math.round(h * 360);
    s = Math.round(s * 100);
    l = Math.round(l * 100);

    return [h, s, l];
}

module.exports = (a, b, mode = "hue") => {
    try {
        if (a && b) {
            const aHls = hexToHslArray(a);
            const bHls = hexToHslArray(b);

            let index = 0;
            index = mode === "saturation" ? 2 : index;
            index = mode === "lightness" ? 1 : index;

            return aHls[index] - bHls[index];
        }
    } catch (error) {
        logger.warn(`Failed to sort colors`);
        logger.warn(error);
        return [];
    }
};
