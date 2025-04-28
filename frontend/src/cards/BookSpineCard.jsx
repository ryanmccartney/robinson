import React from "react";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";

const BookSpineCard = ({
    book,
    spineWidth = "4rem",
    expandedWidth = "20rem",
    minHeight = "24rem",
}) => {
    const [, setShow] = React.useState(false);

    const media = React.useRef(null);
    const card = React.useRef(null);
    const textbox = React.useRef(null);
    const textPos = expandedWidth.split("rem")[0] * 0.7916;

    return (
        <Link style={{ textDecoration: "none" }} to={`/book/${book.bookId}`}>
            <Card
                ref={card}
                onMouseOver={() => {
                    setShow(true);
                    if (media.current) {
                        media.current.style.transform = "1.05";
                        media.current.style.opacity = "0.3";
                        media.current.style.filter = `blur(0px)`;
                    }
                    if (card.current) {
                        card.current.style.boxShadow = "1px 2px 15px #8D8D8D";
                        card.current.style.width = expandedWidth;
                    }
                    textbox.current.style.width = `${expandedWidth.split("rem")[0] * 0.9}rem`;
                    textbox.current.style.rotate = "0deg";
                    textbox.current.style.top = "18rem";
                    textbox.current.style.left = "0rem";
                }}
                onMouseOut={() => {
                    setShow(false);
                    if (media.current) {
                        media.current.style.transform = "1.0";
                        media.current.style.opacity = "1";
                        media.current.style.filter = `blur(80px)`;
                    }
                    if (card.current) {
                        card.current.style.boxShadow = "0px 0px 0px #8D8D8D";
                        card.current.style.width = spineWidth;
                    }
                    textbox.current.style.width = `${minHeight.split("rem")[0] * 0.9}rem`;
                    textbox.current.style.rotate = "-90deg";
                    textbox.current.style.bottom = `${textPos}rem`;
                    textbox.current.style.top = null;
                    textbox.current.style.left = `-${textPos}rem`;
                }}
                variant="outlined"
                sx={{
                    position: "relative",
                    minHeight: minHeight,
                    width: spineWidth,
                }}
            >
                <Box
                    sx={{
                        rotate: "-90deg",
                        zIndex: 1025,
                        width: `${minHeight.split("rem")[0] * 0.9}rem`,
                        position: "absolute",
                        bottom: `${textPos}rem`,
                        left: `-${textPos}rem`,
                        margin: 1,
                    }}
                    ref={textbox}
                >
                    <Typography
                        sx={{ fontSize: "1.1rem", fontWeight: 400 }}
                        variant="h6"
                    >
                        {book.title}
                    </Typography>
                    <Typography sx={{ fontWeight: 200 }} variant="subtitle2">
                        {book.author}
                    </Typography>
                </Box>

                <CardMedia
                    ref={media}
                    sx={{
                        position: "absolute",
                        height: "18rem",
                        width: "100%",
                        filter: `blur(80px)`,
                    }}
                    image={`/api/books/cover/${book.bookId}`}
                    title={book.title}
                />
            </Card>
        </Link>
    );
};
export default BookSpineCard;
