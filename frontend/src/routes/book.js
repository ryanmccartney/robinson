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
        const fetchData = async () => {
            const response = await fetch(`/api/books/${bookId}`);
            const data = await response.json();
            setBook(data.books);
            setRating(data.books.rating);
        };
        fetchData();
    }, []);

    const [rating, setRating] = useState(0);

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
                        src={`/api/books/cover/${book.bookId}`}
                    />
                </Grid>

                <Grid item xs={12} md={8} lg={6}>
                    <Typography variant="h4">{book.title}</Typography>

                    <Typography gutterBottom variant="subtitle">
                        {book.author}
                    </Typography>

                    <br></br>
                    <Rating
                        name="simple-controlled"
                        value={rating}
                        onChange={async (event, newRating) => {
                            await fetch(`/api/books/${bookId}`, {
                                method: "PUT",
                                headers: {
                                    Accept: "application/json",
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify({
                                    rating: newRating,
                                }),
                            });
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
                                Publisher
                            </Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <Typography variant="body2">{book.publisher}</Typography>
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
