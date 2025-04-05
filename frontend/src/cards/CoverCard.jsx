import { useState, useRef } from "react";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { useTheme } from "@mui/material/styles";

import Barcode from "react-barcode";
import isbn from "isbn3";
import fetcher from "@utils/fetcher";

import BookmarkUpdater from "@components/BookmarkUpdater";

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
    const theme = useTheme();
    const [show, setShow] = useState(false);
    const [bookmarkOpener, setBookmarkOpener] = useState(false);
    const card = useRef(null);
    const media = useRef(null);
    const coverRef = useRef(null);

    const getISBN = (isbnString, hypens = true) => {
        if (isbnString) {
            const isbnObject = isbn.parse(isbnString);
            if (isbnObject) {
                if (hypens) {
                    return isbnObject.isbn13h;
                }
                return isbnObject.isbn13;
            }
            return isbnString;
        }
    };

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
                <br></br>

                <Box sx={{ marginTop: 20 }}>
                    <Barcode
                        format="EAN13"
                        width={2}
                        height={40}
                        fontSize={12}
                        value={getISBN(data.book.isbn, false)}
                        background=""
                        lineColor={
                            theme.palette.mode === "light"
                                ? "#1a1a1a"
                                : "#ffffff"
                        }
                        font="Moderustic"
                        displayValue={true}
                        marginLeft={10}
                        marginRight={20}
                    />
                </Box>
            </>
        );
    };

    const handleUpload = async (event) => {
        const file = event.target.files[0];
        const fileBody = await convertBase64(file);
        const updatedData = await fetcher.put(`books/${data?.book?.bookId}`, {
            cover: fileBody,
        });
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
            <BookmarkUpdater
                data={data}
                setData={setData}
                open={bookmarkOpener}
                setOpen={setBookmarkOpener}
            />

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
