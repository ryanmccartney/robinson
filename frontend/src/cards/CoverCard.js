import { useState, useRef } from "react";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import FileUploadIcon from "@mui/icons-material/FileUpload";

import BookmarkUpdater from "../components/BookmarkUpdater";

const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);

        fileReader.onload = () => {
            const data = fileReader.result.split(",")[1];
            resolve(data);
        };

        fileReader.onerror = (error) => {
            reject(error);
        };
    });
};

const BookCard = ({ edit, data, setData, opacity = "1" }) => {
    const [show, setShow] = useState(false);
    const [bookmarkOpener, setBookmarkOpener] = useState(false);
    const card = useRef(null);
    const media = useRef(null);
    const coverRef = useRef(null);

    const getOverlay = () => {
        if (edit) {
            return (
                <>
                    <FileUploadIcon sx={{ fontSize: 50 }} />
                    <br></br>
                    <Typography variant="caption" align="center">
                        Update Cover
                    </Typography>
                </>
            );
        }
        return (
            <>
                <BookmarkIcon sx={{ fontSize: 50 }} />
                <br></br>
                <Typography variant="caption" align="center">
                    Bookmark
                </Typography>
            </>
        );
    };

    const handleUpload = async (event) => {
        const file = event.target.files[0];
        console.log(file);
        const fileBody = await convertBase64(file);
        const response = await fetch(`/api/books/${data?.book?.bookId}`, {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ cover: fileBody }),
        });
        const updatedData = await response.json();
        setData(updatedData);
    };

    const handleOpen = () => {
        if (edit) {
            coverRef.current.click();
        } else {
            setBookmarkOpener(true);
        }
    };
    return (
        <Box>
            <input
                onChange={handleUpload}
                accept="image/*"
                ref={coverRef}
                style={{ display: "none" }}
                type="file"
                name="cover"
            />
            <BookmarkUpdater data={data} setData={setData} open={bookmarkOpener} setOpen={setBookmarkOpener} />

            <Card
                ref={card}
                onMouseOver={() => {
                    setShow(true);
                    if (media.current) {
                        media.current.style.transform = "1.05";
                        media.current.style.opacity = "0.15";
                    }
                    if (card.current) {
                        card.current.style.boxShadow = "1px 2px 15px #8D8D8D";
                    }
                }}
                onMouseOut={() => {
                    setShow(false);
                    if (media.current) {
                        media.current.style.transform = "0.5";
                        media.current.style.opacity = opacity;
                    }
                    if (card.current) {
                        card.current.style.boxShadow = "0px 0px 0px #8D8D8D";
                    }
                }}
                variant="outlined"
                sx={{
                    position: "relative",
                    marginTop: { xs: "1rem", md: "0" },
                    minWidth: { xs: "70%", md: "50%" },
                    maxWidth: { xs: "80%", md: "90%" },
                    width: { xs: "80%", md: "40%" },
                }}
                onClick={handleOpen}
            >
                <CardMedia
                    ref={media}
                    sx={{
                        opacity: opacity,
                        minHeight: "30rem",
                        height: "85%",
                        width: "100%",
                        objectPosition: "50% 0%",
                    }}
                    image={`/api/books/cover/${data.book.bookId}`}
                    component="img"
                    title={data?.book?.title}
                    loading="lazy"
                    alt=""
                />
                {show && (
                    <Box
                        sx={{
                            zIndex: "tooltip",
                            top: "40%",
                            position: "absolute",
                            left: "0",
                            right: "0",
                            marginLeft: "auto",
                            marginRight: "auto",
                        }}
                    >
                        {getOverlay()}
                    </Box>
                )}
            </Card>
        </Box>
    );
};
export default BookCard;
