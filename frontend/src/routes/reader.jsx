import { useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ReactReader } from "react-reader";

import Box from "@mui/material/Box";

import LoadingContent from "@components/LoadingContent";
import BreadcrumbsContext from "@contexts/breadcrumbs";
import ButtonsContext from "@contexts/buttons";
import { useBook } from "@utils/data";
import fetcher from "@utils/fetcher";

const Reader = () => {
    const navigate = useNavigate();
    const { bookId } = useParams();
    const { book, isBookLoading, bookMutate } = useBook(bookId);

    const { setBreadcrumbs } = useContext(BreadcrumbsContext);
    const { setButtons } = useContext(ButtonsContext);

    const updateProgress = async (epubcifi) => {
        console.log(epubcifi);
        await fetcher.put(`books/${bookId}`, { progress: 10 });
        bookMutate();
    };

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
                locationChanged={updateProgress}
                url={`/api/books/ebook/${bookId}.epub`}
            />
        </Box>
    );
};
export default Reader;
