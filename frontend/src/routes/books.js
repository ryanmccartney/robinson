import React, { useState, useEffect, useContext } from "react";
import Grid from "@mui/material/Grid";

import BookCard from "./../cards/BookCard";
import LoadingContent from "./../components/LoadingContent";
import BreadcrumbsContext from "./../contexts/breadcrumbs";

const Books = () => {
    const [data, setData] = useState(null);
    const { breadcrumbs, setBreadcrumbs } = useContext(BreadcrumbsContext);

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
            const response = await fetch(`/api/books`);
            const data = await response.json();
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

    const getBookCards = (books) => {
        const bookCards = [];
        {
            Object.keys(books).forEach((bookId, index) => {
                bookCards.push(
                    <Grid item xs={6} md={3} lg={2}>
                        <BookCard key={index} book={books[bookId]} />
                    </Grid>
                );
            });
        }

        return bookCards;
    };

    return (
        <>
            <Grid container spacing={4}>
                {getBookCards(data.books)}
            </Grid>
        </>
    );
};

export default Books;
