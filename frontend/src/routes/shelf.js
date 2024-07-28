import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import BookSpineCard from "../cards/BookSpineCard";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";

import { useParams } from "react-router-dom";

const Shelf = () => {
    const { shelfId } = useParams();
    const [shelf, setShelf] = useState({});
    const [books, setBooks] = useState([]);

    useEffect(() => {
        fetch(`/api/books/shelf/${shelfId}`)
            .then((response) => response.json())
            .then((json) => {
                setShelf(json.shelf);
                setBooks(json.books);
            })
            .catch((error) => console.error(error));
    }, []);

    const getBookCards = () => {
        const bookCards = [];
        {
            for (let book of books) {
                bookCards.push(<BookSpineCard key={book?.bookId} book={book} />);
            }
        }

        return bookCards;
    };

    return (
        <>
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <Stack sx={{ overflowX: "scroll" }} direction="row" spacing={1}>
                        {getBookCards()}
                    </Stack>
                </Grid>

                <Grid item xs={12} md={8} lg={6}>
                    <Typography gutterBottom variant="h4">
                        {shelf?.name}
                    </Typography>

                    <Typography gutterBottom variant="body2">
                        {shelf?.description}
                    </Typography>

                    <Typography gutterBottom variant="h5">
                        Details
                    </Typography>

                    <Grid
                        container
                        spacing={2}
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="flex-start"
                    ></Grid>
                </Grid>
            </Grid>
        </>
    );
};
export default Shelf;
