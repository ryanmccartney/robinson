"use strict";

const logger = require("@utils/logger")(module);
const getImage = require("@utils/image-get");
const fetchRetry = require("@utils/fetch-retry");

const OPEN_LIBRARY = "https://openlibrary.org";

// Asked for explicitly so the search response stays small -- the default
// document carries edition lists we have no use for.
const SEARCH_FIELDS = [
    "key",
    "title",
    "subtitle",
    "author_name",
    "publisher",
    "publish_date",
    "first_publish_year",
    "number_of_pages_median",
    "cover_i",
].join(",");

const getJson = async (url) => {
    const response = await fetchRetry(url);
    if (!response?.ok) {
        logger.debug(
            `Open library request ${url} returned status ${response?.status}`
        );
        return null;
    }
    return await response.json();
};

// Author names live on their own records, so an edition
// ({ authors: [{ key }] }) and a work ({ authors: [{ author: { key } }] })
// each carry only a pointer. One extra request turns that into a name.
const getAuthorName = async (record) => {
    const key = record?.authors?.[0]?.author?.key ?? record?.authors?.[0]?.key;
    if (!key) {
        return undefined;
    }
    const author = await getJson(`${OPEN_LIBRARY}${key}.json`);
    return author?.name;
};

// A work description is either a plain string or a typed object.
const getDescription = (work) =>
    typeof work?.description === "object"
        ? work?.description?.value
        : work?.description;

const getPages = (edition, searchResult) =>
    [
        edition?.number_of_pages,
        parseInt(edition?.pagination, 10),
        searchResult?.number_of_pages_median,
    ].find((pages) => Number.isFinite(pages));

const getLargestCover = async (coverIds) => {
    let chosen = "";
    for (const coverId of coverIds) {
        const coverData = await getImage(
            `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`
        );
        if (coverData.length > chosen.length) {
            chosen = coverData;
        }
    }
    return chosen;
};

module.exports = async (isbn) => {
    let parsedData = {};

    try {
        if (!isbn) {
            logger.warn(`Open library API request no ISBN provided`);
            return {};
        }

        const edition = await getJson(
            `${OPEN_LIBRARY}/isbn/${encodeURIComponent(isbn)}.json`
        );

        // An edition record can exist carrying nothing but a pointer to its
        // work. Open Library creates these stubs for new releases, so follow
        // the pointer rather than reporting the book as untitled.
        let work = null;
        if (!edition?.title && edition?.works?.[0]?.key) {
            work = await getJson(`${OPEN_LIBRARY}${edition.works[0].key}.json`);
        }

        // That work can be just as empty. The search index is populated
        // separately and usually does hold a complete record, often under a
        // different work id, so it is the last place worth looking.
        let searchResult = null;
        if (!edition?.title && !work?.title) {
            const search = await getJson(
                `${OPEN_LIBRARY}/search.json?q=${encodeURIComponent(isbn)}` +
                    `&limit=5&fields=${SEARCH_FIELDS}`
            );
            searchResult = search?.docs?.find((doc) => doc?.title);
        }

        const title = edition?.title ?? work?.title ?? searchResult?.title;
        if (!title) {
            logger.warn(
                `Open library API request for ${isbn} returned no results`
            );
            return {};
        }

        logger.info(`Open library API request for ${isbn}`);
        logger.debug(
            JSON.stringify({ edition, work, searchResult }, undefined, 4)
        );

        const coverIds =
            edition?.covers ??
            work?.covers ??
            (searchResult?.cover_i ? [searchResult.cover_i] : []);

        parsedData = {
            title: title,
            subtitle:
                edition?.subtitle ?? work?.subtitle ?? searchResult?.subtitle,
            author:
                (await getAuthorName(edition)) ??
                (await getAuthorName(work)) ??
                searchResult?.author_name?.[0],
            publisher: edition?.publishers?.[0] ?? searchResult?.publisher?.[0],
            publishDate:
                edition?.publish_date ??
                searchResult?.publish_date?.[0] ??
                searchResult?.first_publish_year,
            description: getDescription(work) ?? edition?.subtitle,
            pages: getPages(edition, searchResult),
            isbn: edition?.isbn_13?.[0] ?? isbn,
            cover: await getLargestCover(coverIds),
        };
    } catch (error) {
        logger.warn(`Open library API request for ${isbn} failed`);
        logger.debug(error);
    }

    return parsedData;
};
