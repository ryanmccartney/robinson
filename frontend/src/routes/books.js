import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import BookCard from "./../cards/BookCard";

const Books = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        fetch(`/api/books`)
            .then((response) => response.json())
            .then((json) => setBooks(json.data))
            .catch((error) => console.error(error));
    }, []);

    const getBookCards = () => {
        const bookCards = [];
        {
            Object.keys(books).forEach((bookId, index) => {
                bookCards.push(<BookCard key={index} book={books[bookId]} />);
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
