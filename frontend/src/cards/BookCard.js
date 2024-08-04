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

const BookCard = ({ book, width = "100%", height = "24rem", opacity = "1" }) => {
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
        <Link style={{ flexShrink: 0, textDecoration: "none" }} to={`/book/${book.bookId}`}>
            <Box sx={{ width: width, minHeight: height }}>
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
                        media.current.style.transform = "0.5";
                        media.current.style.opacity = opacity;
                        card.current.style.boxShadow = "0px 0px 0px #8D8D8D";
                    }}
                    variant="outlined"
                    sx={{ position: "relative", width: "100%", minHeight: height }}
                >
                    {show && (
                        <Box sx={{ m: 4, zIndex: "tooltip", position: "absolute", top: 0, left: 0 }}>
                            <Typography gutterBottom variant="subtitle2">
                                {trimToLength(book.description, 20)}
                            </Typography>
                            <Typography variant="caption" align="right">{`${getDate(book.publishDate)}`}</Typography>
                            <Typography
                                variant="overline"
                                display="block"
                                gutterBottom
                            >{`${book.pages} pages`}</Typography>
                        </Box>
                    )}
                    <Box
                        sx={{
                            height: "85%",
                            width: "100%",
                            zIndex: "modal",
                            position: "absolute",
                            top: 0,
                            left: 0,
                        }}
                    >
                        <CardMedia
                            ref={media}
                            sx={{ opacity: opacity, height: "85%", width: "100%", objectPosition: "50% 0%" }}
                            title={book.title}
                            image={`/api/books/cover/${book.bookId}`}
                            component="img"
                        />

                        <CardContent>
                            <Typography sx={{ fontSize: "1.1rem", fontWeight: 400 }} variant="h6">
                                {book.title}
                            </Typography>
                            <Typography sx={{ paddingTop: "0.2rem", fontWeight: 200 }} variant="subtitle2">
                                {book.author}
                            </Typography>
                        </CardContent>
                    </Box>
                </Card>
            </Box>
        </Link>
    );
};
export default BookCard;
