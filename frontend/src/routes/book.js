import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Rating from "@mui/material/Rating";
import { useParams } from "react-router-dom";
import Barcode from "react-barcode";

const Book = () => {
    const { bookId } = useParams();
    const [book, setBook] = useState(null);

    useEffect(() => {
        fetch(`/api/books/${bookId}`)
            .then((response) => response.json())
            .then((json) => setBook(json.data))
            .catch((error) => console.error(error));
    }, []);

    const [rating, setRating] = React.useState(book?.rating);

    if (!book) {
        return null;
    }

    return (
        <>
            <Grid container spacing={4}>
                <Grid item align="center" xs={12} md={4} lg={6}>
                    <Box
                        component="img"
                        sx={{
                            minWidth: "50%",
                            maxWidth: "80%",
                        }}
                        alt={`${book.title} Cover`}
                    />
                </Grid>

                <Grid item xs={12} md={8} lg={6}>
                    <Typography gutterBottom variant="h4">
                        {book.title}
                    </Typography>

                    <Rating
                        name="simple-controlled"
                        value={rating}
                        onChange={(event, newRating) => {
                            setRating(newRating);
                        }}
                    />

                    <Typography gutterBottom variant="body2">
                        {book.description}
                    </Typography>

                    <Typography gutterBottom variant="h5">
                        Details
                    </Typography>

                    <Grid container spacing={2} direction="row" justifyContent="flex-start" alignItems="flex-start">
                        <Grid item xs={4}>
                            <Typography fontWeight="fontWeightMedium" variant="body2">
                                Author
                            </Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <Typography variant="body2">{book.author}</Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography fontWeight="fontWeightMedium" variant="body2">
                                Published
                            </Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <Typography variant="body2">{book.publishDate}</Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography fontWeight="fontWeightMedium" variant="body2">
                                Pages
                            </Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <Typography variant="body2">{book.pages}</Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography fontWeight="fontWeightMedium" variant="body2">
                                ISBN
                            </Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <Typography variant="body2">{book.isbn}</Typography>
                        </Grid>
                    </Grid>

                    <Barcode value={book.isbn.toString()} />
                </Grid>
            </Grid>
        </>
    );
};
export default Book;
