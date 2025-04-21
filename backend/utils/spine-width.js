const pageWidth = process.env.PAGE_WIDTH || 0.009;
const hardbackCoverWidth = process.env.HARDBACK_COVER_WIDTH || 0.5;
const paperbackCoverWidth = process.env.PAPERBACK_COVER_WIDTH || 0.2;

module.exports = (pages, hardback = false) => {
    const adjustedPages = pages ? pages : 275;
    const coverWidth = hardback ? hardbackCoverWidth : paperbackCoverWidth;
    return adjustedPages * pageWidth + coverWidth;
};
