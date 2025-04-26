import { useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ReactReader } from "react-reader";

import Box from "@mui/material/Box";

import LoadingContent from "@components/LoadingContent";
import BreadcrumbsContext from "@contexts/breadcrumbs";
import ButtonsContext from "@contexts/buttons";
import { useBook } from "@utils/data";

const Reader = () => {
    const navigate = useNavigate();
    const { bookId } = useParams();
    const { book, isBookLoading } = useBook(bookId);

    const { setBreadcrumbs } = useContext(BreadcrumbsContext);
    const { setButtons } = useContext(ButtonsContext);

    // const handleRendition = async (rendition) => {
    //     await rendition.book.locations.generate();
    //     const totalPages = parseInt(rendition.book.locations.length());
    //     rendition.on("relocated", (location) => {
    //         const currentLocation = location.start.cfi;
    //         const currentPage = parseInt(
    //             rendition.book.locations.locationFromCfi(currentLocation) + 1
    //         );
    //     });
    // };

    useEffect(() => {
        setBreadcrumbs([
            { title: "Home", link: `/` },
            {
                title: book?.case?.name || "Case",
                link: `/case/${book?.case?.caseId}`,
            },
            {
                title: book?.shelf?.name || "Shelf",
                link: `/shelf/${book?.shelf?.shelfId}`,
            },
            {
                title: book?.title || "Book",
                link: `/book/${book?.bookId}`,
            },
        ]);

        return () => {
            setBreadcrumbs([]);
            setButtons([]);
        };
    }, [book]);

    if (isBookLoading) {
        return <LoadingContent />;
    }

    if (!isBookLoading && !book) {
        navigate(`/books`);
        return <LoadingContent />;
    }

    return (
        <Box sx={{ height: "80vh" }}>
            <ReactReader
                location={book.progress}
                //getRendition={handleRendition}
                url={`/api/books/ebook/${bookId}.epub`}
                epubInitOptions={{
                    openAs: "epub",
                }}
                epubOptions={{
                    allowPopups: false,
                    allowScriptedContent: false,
                }}
            />
        </Box>
    );
};
export default Reader;
