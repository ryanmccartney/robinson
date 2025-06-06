import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Box from "@mui/material/Box";

import trimToLength from "@utils/trimToLength";
import formatQuantity from "@utils/formatQuantity";

const CaseCard = ({ bookcase, maxBooks = 9 }) => {
    const [show, setShow] = useState(false);
    const [books, setBooks] = useState([]);

    const media = useRef(null);
    const card = useRef(null);

    useEffect(() => {
        const bookIds = [];
        for (const shelf of bookcase.shelves) {
            for (const bookId of shelf.books) {
                bookIds.push(bookId);
                if (bookIds.length >= maxBooks) {
                    break;
                }
            }
        }
        setBooks(bookIds);
    }, [bookcase]);

    return (
        <Grid size={{ xs: 6, md: 3, lg: 2 }}>
            <Link
                style={{ textDecoration: "none" }}
                to={`/case/${bookcase.caseId}`}
            >
                <Box sx={{ width: "100%", minHeight: 400 }}>
                    <Card
                        ref={card}
                        onMouseOver={() => {
                            setShow(true);
                            if (media.current) {
                                media.current.style.transform = "1.05";
                                media.current.style.opacity = "0.15";
                            }
                            if (card.current) {
                                card.current.style.boxShadow =
                                    "1px 2px 15px #8D8D8D";
                            }
                        }}
                        onMouseOut={() => {
                            setShow(false);
                            if (media.current) {
                                media.current.style.transform = "1.0";
                                media.current.style.opacity = "1";
                            }
                            if (card.current) {
                                card.current.style.boxShadow =
                                    "0px 0px 0px #8D8D8D";
                            }
                        }}
                        variant="outlined"
                        sx={{
                            position: "relative",
                            width: "100%",
                            height: "25rem",
                        }}
                    >
                        {show && (
                            <Box
                                sx={{
                                    m: 4,
                                    zIndex: 1025,
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                }}
                            >
                                <Typography gutterBottom variant="subtitle2">
                                    {trimToLength(bookcase.description, 20)}
                                </Typography>
                            </Box>
                        )}
                        <Box
                            sx={{
                                height: "100%",
                                width: "100%",
                                zIndex: 1000,
                                position: "absolute",
                                overflow: "hidden",
                                top: 0,
                                left: 0,
                            }}
                        >
                            <Box
                                sx={{
                                    height: "75%",
                                    overflow: "hidden",
                                    top: 0,
                                    left: 0,
                                }}
                            >
                                <ImageList
                                    ref={media}
                                    sx={{ margin: 0.1, overflow: "none" }}
                                    variant="masonry"
                                    cols={3}
                                    gap={4}
                                >
                                    {books.map((bookId) => (
                                        <ImageListItem key={bookId}>
                                            <img
                                                srcSet={`/api/books/cover/${bookId}`}
                                                src={`/api/books/cover/${bookId}`}
                                                loading="lazy"
                                                alt=""
                                            />
                                        </ImageListItem>
                                    ))}
                                </ImageList>
                            </Box>

                            <CardContent>
                                <Typography
                                    sx={{ fontSize: "1.1rem", fontWeight: 400 }}
                                    variant="h6"
                                >
                                    {bookcase.name}
                                </Typography>
                                <Typography
                                    sx={{
                                        paddingTop: "0.2rem",
                                        fontWeight: 200,
                                    }}
                                    variant="subtitle1"
                                >
                                    {`${formatQuantity(
                                        bookcase.shelves.length,
                                        "shelf",
                                        "shelves"
                                    )},  ${formatQuantity(
                                        books.length,
                                        "book"
                                    )}`}
                                </Typography>
                            </CardContent>
                        </Box>
                    </Card>
                </Box>
            </Link>
        </Grid>
    );
};
export default CaseCard;
