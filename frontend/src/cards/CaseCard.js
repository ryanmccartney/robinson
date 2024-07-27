import React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

import Box from "@mui/material/Box";
import { Link } from "react-router-dom";

const options = {
    shouldForwardProp: (prop) => prop !== "hoverShadow",
};

const bookcaseCard = ({ bookcase }) => {
    const [show, setShow] = React.useState(false);
    const media = React.useRef(null);
    const card = React.useRef(null);

    return (
        <Grid item xs={6} md={3} lg={2}>
            <Link style={{ textDecoration: "none" }} to={`/case/${bookcase.caseId}`}>
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
                        {show && <Box sx={{ m: 4, zIndex: "tooltip", position: "absolute", top: 0, left: 0 }}></Box>}
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
                                sx={{ align: "center", height: 250, width: "90%" }}
                                variant="masonry"
                                cols={3}
                                gap={8}
                            >
                                {/* {bookcase.books.map((book) => (
                                    <ImageListItem key={book}>
                                        <img
                                            srcSet={books[book].cover}
                                            src={books[book].cover}
                                            alt={books[book].title}
                                            loading="lazy"
                                        />
                                    </ImageListItem>
                                ))} */}
                            </ImageList>

                            <CardContent>
                                <Typography variant="h6">{bookcase.name}</Typography>
                                <Typography variant="subtitle">{bookcase.description}</Typography>
                            </CardContent>
                        </Box>
                    </Card>
                </Box>
            </Link>
        </Grid>
    );
};

export default bookcaseCard;
