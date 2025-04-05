import React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

import Box from "@mui/material/Box";
import { Link } from "react-router-dom";

const ShelfCard = ({ shelf }) => {
    const [show, setShow] = React.useState(false);
    const media = React.useRef(null);
    const card = React.useRef(null);

    return (
        <Grid size={{ xs: 6, md: 3, lg: 2 }}>
            <Link
                style={{ textDecoration: "none" }}
                to={`/shelf/${shelf.shelfId}`}
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
                                    zIndex: "tooltip",
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                }}
                            >
                                <Typography variant="subtitle1">
                                    {shelf.books.length} books
                                </Typography>
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
                            <ImageList
                                ref={media}
                                sx={{ margin: 1, overflow: "none" }}
                                variant="masonry"
                                cols={3}
                                gap={4}
                            >
                                {shelf.books.map((bookId) => (
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

                            <CardContent
                                sx={{
                                    m: 4,
                                    zIndex: "tooltip",
                                    position: "absolute",
                                    bottom: "-8.2rem",
                                    left: "-1.5rem",
                                    width: "100%",
                                }}
                            >
                                <Typography variant="h6">
                                    {shelf.name}
                                </Typography>
                                <Typography gutterBottom variant="subtitle2">
                                    {shelf.books.length} books
                                </Typography>
                            </CardContent>
                        </Box>
                    </Card>
                </Box>
            </Link>
        </Grid>
    );
};
export default ShelfCard;
