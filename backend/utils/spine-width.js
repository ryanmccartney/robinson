const pageWidth = parseFloat(process.env.PAGE_WIDTH) || 0.007;
const hardbackCoverWidth = parseFloat(process.env.HARDBACK_COVER_WIDTH) || 0.5;
const paperbackCoverWidth =
    parseFloat(process.env.PAPERBACK_COVER_WIDTH) || 0.2;

module.exports = (pages, hardback = false) => {
    const adjustedPages = pages ? pages : 275;
    const coverWidth = hardback ? hardbackCoverWidth : paperbackCoverWidth;
    return (adjustedPages / 2) * pageWidth + coverWidth;
};
