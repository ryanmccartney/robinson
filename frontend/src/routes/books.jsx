import { useEffect, useContext } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import { useBooks } from "@utils/data";
import BookCard from "@cards/BookCard";
import LoadingContent from "@components/LoadingContent";
import BreadcrumbsContext from "@contexts/breadcrumbs";

const Books = () => {
    const { books, isBooksLoading } = useBooks();
    const { setBreadcrumbs } = useContext(BreadcrumbsContext);

    useEffect(() => {
        setBreadcrumbs([
            { title: "Home", link: `/` },
            { title: "Cases", link: `/cases` },
            { title: "Shelves", link: `/shelves` },
            { title: "Books", link: `/books` },
        ]);
        return () => {
            setBreadcrumbs([]);
        };
    }, []);

    if (isBooksLoading) {
        return <LoadingContent />;
    }

    const getBookCards = () => {
        const bookCards = [];
        {
            Object.keys(books).forEach((bookId, index) => {
                bookCards.push(
                    <Grid key={bookId} size={{ xs: 6, md: 3, lg: 2 }}>
                        <BookCard key={index} book={books[bookId]} />
                    </Grid>
                );
            });
        }

        return bookCards;
    };

    return (
        <Box sx={{ m: 2 }}>
            <Grid container spacing={2}>
                {getBookCards()}
            </Grid>
        </Box>
    );
};

export default Books;
