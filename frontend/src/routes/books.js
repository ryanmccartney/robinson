import React from "react";
import Grid from "@mui/material/Grid";
import BookCard from "./../cards/BookCard";
import { books } from "../tests/data";

const Books = () => {
    const getBookCards = () => {
        const bookCards = [];
        {
            Object.keys(books).forEach((id, index) => {
                bookCards.push(<BookCard key={id} book={books[id]} />);
            });
        }

        return bookCards;
    };

    return (
        <>
            <Grid container spacing={4}>
                {getBookCards()}
            </Grid>
        </>
    );
};

export default Books;
