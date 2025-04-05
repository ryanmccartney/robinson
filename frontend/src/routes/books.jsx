import { useState, useEffect, useContext } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import fetcher from "@utils/fetcher";

import BookCard from "@cards/BookCard";
import LoadingContent from "@components/LoadingContent";
import BreadcrumbsContext from "@contexts/breadcrumbs";

const Books = () => {
    const [data, setData] = useState(null);
    const { setBreadcrumbs } = useContext(BreadcrumbsContext);

    const setContexts = () => {
        setBreadcrumbs([
            { title: "Home", link: `/` },
            { title: "Cases", link: `/cases` },
            { title: "Shelves", link: `/shelves` },
            { title: "Books", link: `/books` },
        ]);
    };

    //On component Mount
    useEffect(() => {
        const fetchData = async () => {
            const data = await fetcher(`books`);
            setData(data);
            setContexts();
        };
        fetchData();
    }, []);

    //On component Unmount (cleanup)
    useEffect(() => {
        return () => {
            setBreadcrumbs([]);
        };
    }, []);

    if (!data) {
        return <LoadingContent />;
    }

    const getBookCards = (books = {}) => {
        const bookCards = [];
        {
            Object.keys(books).forEach((bookId, index) => {
                bookCards.push(
                    <Grid item size={{ xs: 6, md: 3, lg: 2 }}>
                        <BookCard key={index} book={books[bookId]} />
                    </Grid>
                );
            });
        }

        return bookCards;
    };

    return (
        <Box sx={{ m: 2 }}>
            <Grid container spacing={4}>
                {getBookCards(data?.books)}
            </Grid>
        </Box>
    );
};

export default Books;
