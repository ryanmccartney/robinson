import React from "react";
import Typography from "@mui/material/Typography";
import BookSpineCard from "../cards/BookSpineCard";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";

import { useParams } from "react-router-dom";
import { shelves, books } from "../tests/data";

const Shelf = () => {
    const { shelfId } = useParams();

    const shelf = shelves[shelfId];

    const getBookCards = () => {
        const bookCards = [];
        {
            for (let bookId of shelf.books) {
                bookCards.push(<BookSpineCard key={bookId} book={books[bookId]} />);
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
                        {shelf.title}
                    </Typography>

                    <Typography gutterBottom variant="body2">
                        {shelf.description}
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
