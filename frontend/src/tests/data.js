//Some test book data
const books = {
    LeRokD4E2zRXdjw: {
        rating: 2,
        id: "LeRokD4E2zRXdjw",
        title: "Gulliver's travels",
        author: "Jonathan Swift",
        cover: "https://covers.openlibrary.org/b/id/12718787-L.jpg",
        isbn: 393957241,
        description:
            "Shipwrecked and cast adrift, Lemuel Gulliver wakes to find himself in Lilliput, an island inhabited by little people, whose six-inch height makes their quarrels over fashion and fame seem ridiculous. His subsequent encounters - with the crude giants of Brobdingnag, the abstracted scientists of Laputa, the philosophical Houyhnhnms and brutish Yahoos - give Gulliver new, bitter insights into human behaviour.",
        published: 2002,
        pages: 511,
        weight: 0.64,
    },
    CmkErhgfoxT4D2w: {
        rating: 2.5,
        id: "CmkErhgfoxT4D2w",
        title: " Great Expectations",
        author: "Charles Dickens",
        cover: "https://ia904703.us.archive.org/view_archive.php?archive=/9/items/l_covers_0012/l_covers_0012_15.zip&file=0012152652-L.jpg",
        isbn: 9781851710102,
        description:
            "The orphan, Pip, and the convict, Magwitch, the beautiful Estella, and her guardian, the embittered and vengeful Miss Havisham, the ambitious lawyer, Mr. Jaggers -- all have a part to play in the mystery.",
        published: 1985,
        pages: 277,
        weight: 0.23,
    },
    LmkErhggoxT4D2w: {
        rating: 4,
        id: "LmkErhggoxT4D2w",
        title: "Oliver Twist",
        author: "Charles Dickens",
        cover: "https://covers.openlibrary.org/b/id/13031365-L.jpg",
        isbn: 141439742,
        description:
            "The story of the orphan Oliver, who runs away from the workhouse, only to be taken in by a den of thieves, shocked readers when it was first published. Dickens's tale of childhood innocence beset by evil depicts the dark criminal underworld of a London peopled by vivid and memorable characters — the arch-villain Fagin, the artful Dodger, the menacing Bill Sikes and the prostitute Nancy. Combining elements of Gothic romance, the Newgate novel and popular melodrama, in Oliver Twist Dickens created an entirely new kind of fiction, scathing in its indictment of a cruel society, and pervaded by an unforgettable sense of threat and mystery.\r\n\r\nThis is the first critical edition to use the serial text of 1837—9 presenting Oltver Twist as it appeared to its earliest readers. It includes Dickens's 1841 introduction and 1 850 preface, the original illustrations and a glossary of contemporary slang.",
        published: 2003,
        pages: 554,
        weight: 0.4,
    },
    DHkErhggoxT4D2w: {
        id: "DHkErhggoxT4D2w",
        title: "Decline and Fall",
        author: "Evelyn Waugh",
        cover: "https://m.media-amazon.com/images/I/91za6Pl3reL._SL1500_.jpg",
        isbn: 241585295,
        description:
            "Sent down from Oxford in outrageous circumstances, Paul Pennyfeather is oddly unsurprised to find himself qualifying for the position of schoolmaster at Llanabba Castle. His colleagues are an assortment of misfits, rascals and fools, including Prendy (plagued by doubts) and Captain Grimes, who is always in the soup (or just plain drunk). Then Sports Day arrives, and with it the delectable Margot Beste-Chetwynde, floating on a scented breeze. As the farce unfolds and the young run riot, no one is safe, least of all Paul.",
        published: 2022,
        pages: 304,
        weight: 0.23,
    },
};

const shelves = {
    shelf1: {
        id: "shelf1",
        title: "Shelf 1",
        case: "case123",
        order: 1,
        length: 10,
        capacity: 50,
        books: ["DHkErhggoxT4D2w", "LeRokD4E2zRXdjw", "LmkErhggoxT4D2w"],
    },
    shelf2: {
        id: "shelf2",
        title: "Shelf 1",
        case: "case123",
        order: 2,
        length: 10,
        capacity: 30,
        books: ["DHkErhggoxT4D2w", "CmkErhgfoxT4D2w", "LmkErhggoxT4D2w", "CmkErhgfoxT4D2w"],
    },
};

const cases = {
    case1: {
        id: "case1",
        location: "Beside the Bin",
        title: "Bookcase 1",
        library: "library1",
        order: 1,
        capacity: 50,
        shelves: ["shelf1"],
    },
    case2: {
        id: "case2",
        location: "Under the stairs",
        title: "Bookcase 2",
        case: "library2",
        order: 2,
        capacity: 30,
        shelves: ["shelf2"],
    },
};

export { books, shelves };
