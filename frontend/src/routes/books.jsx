import { useEffect, useContext, useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import { useLocalStorageState } from "@utils/useLocalStorage";
import { useBooks } from "@utils/data";
import BookCard from "@cards/BookCard";
import LoadingContent from "@components/LoadingContent";
import BreadcrumbsContext from "@contexts/breadcrumbs";
import ButtonsContext from "@contexts/buttons";
import NotFound from "@components/NotFound";
import SortMenu from "@components/SortMenu";

const BooksList = ({ filter }) => {
    const { books, isBooksLoading, booksMutate } = useBooks(filter);

    const getBookCards = () => {
        const bookCards = [];
        {
            books &&
                Object.keys(books).forEach((bookId, index) => {
                    bookCards.push(
                        <Grid key={bookId} size={{ xs: 6, md: 3, lg: 2 }}>
                            <BookCard key={index} book={books[bookId]} />
                        </Grid>
                    );
                });
        }

        if (bookCards.length === 0) {
            return (
                <NotFound
                    label="book"
                    link="books"
                    mutate={booksMutate}
                    data={{ title: "My First Book" }}
                />
            );
        }

        return bookCards;
    };

    if (isBooksLoading) {
        return <LoadingContent />;
    }

    return (
        <Grid container spacing={2}>
            {getBookCards()}
        </Grid>
    );
};

const Books = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [filter, setFilter] = useLocalStorageState("booksFilter", {
        lastUpdated: 1,
    });

    const { setBreadcrumbs } = useContext(BreadcrumbsContext);
    const { setButtons } = useContext(ButtonsContext);

    useEffect(() => {
        setBreadcrumbs([
            { title: "Home", link: `/` },
            { title: "Cases", link: `/cases` },
            { title: "Shelves", link: `/shelves` },
            { title: "Books", link: `/books` },
        ]);
        setButtons([
            {
                label: "Sort",
                icon: "SwapVert",
                callback: (event) => {
                    setAnchorEl(event.currentTarget);
                },
            },
        ]);
        return () => {
            setBreadcrumbs([]);
            setButtons([]);
        };
    }, []);

    return (
        <Box sx={{ m: 2 }}>
            <SortMenu
                setAnchorEl={setAnchorEl}
                anchorEl={anchorEl}
                setFilter={setFilter}
                filter={filter}
            ></SortMenu>
            <BooksList filter={filter} />
        </Box>
    );
};

export default Books;
