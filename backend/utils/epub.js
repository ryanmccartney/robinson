const unzipper = require("unzipper");
const { XMLParser } = require("fast-xml-parser");

const parser = new XMLParser({
    ignoreAttributes: false,
});

const unzipAndGrab = async (zipBuffer, filePath) => {
    const directory = await unzipper.Open.buffer(zipBuffer);
    for (const file of directory.files) {
        if (file.path.includes(filePath)) {
            const contentBuffer = await file.buffer();
            return contentBuffer.toString("utf8");
        }
    }
};

const metadata = async (epubBuffer) => {
    const data = await unzipAndGrab(epubBuffer, ".opf");

    const dataParsed = parser.parse(data);
    const parsedMetadata = {};

    for (const [key, value] of Object.entries(dataParsed.package.metadata)) {
        if (key.includes("dc:")) {
            const keyParsed = key.split(":");
            if (typeof value === "object" && !Array.isArray(value)) {
                parsedMetadata[keyParsed[1]] = value["#text"];
            } else {
                parsedMetadata[keyParsed[1]] = value;
            }
        }
    }

    for (const item of dataParsed.package.metadata.meta) {
        const property = item["@_property"]?.split(":");
        if (property && property[1] && item["#text"]) {
            parsedMetadata[property[1]] = item["#text"];
        }
    }

    if (Array.isArray(dataParsed.package.metadata["dc:identifier"])) {
        for (const identifiers of dataParsed.package.metadata["dc:identifier"]) {
            if (identifiers["@_id"] === "isbn-id") {
                parsedMetadata.isbn = identifiers["#text"];
            }

            if (identifiers["@_id"] === "uid") {
                parsedMetadata.uid = identifiers["#text"];
            }
        }
    }

    return parsedMetadata;
};

module.exports = { metadata };
