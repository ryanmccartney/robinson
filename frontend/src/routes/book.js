import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Rating from "@mui/material/Rating";
import { useParams } from "react-router-dom";
import { books } from "../tests/data";
import Barcode from "react-barcode";

const Book = () => {
    const { bookId } = useParams();
    const book = books[bookId];
    const [rating, setRating] = React.useState(book?.rating);

    console.log(book);
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
                        src={book.cover}
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
                            <Typography variant="body2">{book.published}</Typography>
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
                            <Typography fontWeight="fontWeightLarge" variant="body2">
                                Weight
                            </Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <Typography variant="body2">{book.weight * 1000}g</Typography>
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
