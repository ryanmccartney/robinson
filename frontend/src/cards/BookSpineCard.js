import React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";
import trimToLength from "../utils/trimToLength";
import { Link } from "react-router-dom";

const options = {
    shouldForwardProp: (prop) => prop !== "hoverShadow",
};

const BookSpineCard = ({ book }) => {
    const [show, setShow] = React.useState(false);

    const media = React.useRef(null);
    const card = React.useRef(null);
    const textbox = React.useRef(null);
    return (
        <Link style={{ textDecoration: "none" }} to={`/book/${book.id}`}>
            <Card
                ref={card}
                onMouseOver={() => {
                    setShow(true);
                    media.current.style.transform = "1.05";
                    media.current.style.opacity = "0.3";
                    media.current.style.filter = `blur(0px)`;
                    card.current.style.boxShadow = "1px 2px 15px #8D8D8D";
                    card.current.style.width = "12rem";
                    textbox.current.style.rotate = "0deg";
                    textbox.current.style.bottom = "0rem";
                    textbox.current.style.left = "0rem";
                }}
                onMouseOut={() => {
                    setShow(false);
                    media.current.style.transform = "1.0";
                    media.current.style.opacity = "1";
                    media.current.style.filter = `blur(80px)`;
                    card.current.style.boxShadow = "0px 0px 0px #8D8D8D";
                    card.current.style.width = "4rem";
                    textbox.current.style.rotate = "-90deg";
                    textbox.current.style.bottom = "8.5rem";
                    textbox.current.style.left = "-8.5rem";
                }}
                variant="outlined"
                sx={{ position: "relative", height: "20rem", width: "4rem" }}
            >
                <Box
                    sx={{
                        rotate: "-90deg",
                        zIndex: "tooltip",
                        width: "20rem",
                        position: "absolute",
                        bottom: "8.5rem",
                        left: "-8.5rem",
                        margin: 1,
                    }}
                    ref={textbox}
                >
                    <Typography variant="h6">{book.title}</Typography>
                    <Typography variant="subtitle">{book.author}</Typography>
                </Box>

                <CardMedia
                    ref={media}
                    sx={{
                        position: "absolute",
                        height: "20rem",
                        width: "100%",
                        filter: `blur(80px)`,
                    }}
                    image={book.cover}
                    title={book.title}
                />
            </Card>
        </Link>
    );
};
export default BookSpineCard;
