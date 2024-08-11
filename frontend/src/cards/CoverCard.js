import { useState, useRef } from "react";
import { Link } from "react-router-dom";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { red } from "@mui/material/colors";

import BookmarkUpdater from "../components/BookmarkUpdater";

const BookCard = ({ edit, data, setData, opacity = "1" }) => {
    const [show, setShow] = useState(false);
    const [bookmarkOpener, setBookmarkOpener] = useState(false);
    const card = useRef(null);
    const media = useRef(null);

    return (
        <Box>
            <BookmarkUpdater data={data} setData={setData} open={bookmarkOpener} setOpen={setBookmarkOpener} />

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
                sx={{
                    position: "relative",
                    marginTop: { xs: "1rem", md: "0" },
                    minWidth: { xs: "70%", md: "50%" },
                    maxWidth: { xs: "80%", md: "90%" },
                    width: { xs: "80%", md: "40%" },
                }}
                onClick={() => setBookmarkOpener(true)}
            >
                <CardMedia
                    ref={media}
                    sx={{ opacity: opacity, height: "85%", width: "100%", objectPosition: "50% 0%" }}
                    image={`/api/books/cover/${data.book.bookId}`}
                    component="img"
                />
                {show && (
                    <Box
                        sx={{
                            zIndex: "tooltip",
                            top: "50%",
                            position: "absolute",
                            left: "0",
                            right: "0",
                            marginLeft: "auto",
                            marginRight: "auto",
                        }}
                    >
                        <BookmarkIcon sx={{ fontSize: 50 }} />
                        <br></br>
                        <Typography variant="caption" align="center">
                            Bookmark
                        </Typography>
                    </Box>
                )}
            </Card>
        </Box>
    );
};
export default BookCard;
