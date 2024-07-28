import React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";
import trimToLength from "./../utils/trimToLength";
import { Link } from "react-router-dom";

const options = {
    shouldForwardProp: (prop) => prop !== "hoverShadow",
};

const BookCard = ({ book }) => {
    const [show, setShow] = React.useState(false);
    const media = React.useRef(null);
    const card = React.useRef(null);

    const getDate = (datetime) => {
        const dateObject = new Date(datetime);

        const month = dateObject.toLocaleString("default", { month: "long" });
        const year = dateObject.getFullYear();

        return `${month} ${year}`;
    };

    return (
        <Grid item xs={6} md={3} lg={2}>
            <Link style={{ textDecoration: "none" }} to={`/book/${book.bookId}`}>
                <Box sx={{ width: "100%", minHeight: 400 }}>
                    <Card
                        ref={card}
                        onMouseOver={() => {
                            setShow(true);
                            media.current.style.transform = "1.05";
                            media.current.style.opacity = "0.15";
                            card.current.style.boxShadow = "1px 2px 15px #8D8D8D";
                        }}
                        onMouseOut={() => {
                            setShow(false);
                            media.current.style.transform = "1.0";
                            media.current.style.opacity = "1";
                            card.current.style.boxShadow = "0px 0px 0px #8D8D8D";
                        }}
                        variant="outlined"
                        sx={{ position: "relative", width: "100%", height: "25rem" }}
                    >
                        {show && (
                            <Box sx={{ m: 4, zIndex: "tooltip", position: "absolute", top: 0, left: 0 }}>
                                <Typography gutterBottom variant="body2">
                                    {trimToLength(book.description)}
                                </Typography>
                                <Typography variant="caption" align="right">{`${getDate(
                                    book.publishDate
                                )}`}</Typography>
                                <Typography
                                    variant="overline"
                                    display="block"
                                    gutterBottom
                                >{`${book.pages} pages`}</Typography>
                            </Box>
                        )}
                        <Box
                            sx={{
                                height: 300,
                                width: "100%",
                                zIndex: "modal",
                                position: "absolute",
                                top: 0,
                                left: 0,
                            }}
                        >
                            <CardMedia
                                ref={media}
                                sx={{ height: 300, width: "100%" }}
                                title={book.title}
                                image={`/api/books/cover/${book.bookId}`}
                            />

                            <CardContent>
                                <Typography variant="h6">{book.title}</Typography>
                                <Typography variant="subtitle">{book.author}</Typography>
                            </CardContent>
                        </Box>
                    </Card>
                </Box>
            </Link>
        </Grid>
    );
};
export default BookCard;
