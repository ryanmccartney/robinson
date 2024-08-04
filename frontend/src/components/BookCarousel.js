import React, { useState, useEffect } from "react";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import IconResolver from "./IconResolver";
import BookSpineCard from "./../cards/BookSpineCard";
import BookCard from "./../cards/BookCard";

const BookCarousel = ({ books = [], title }) => {
    const carousel = React.useRef(null);

    const [view, setView] = useState(false);
    const [button, setButton] = useState({
        icon: "AutoStories",
        label: "View covers",
    });

    const scroll = (scrollOffset) => {
        carousel.current.scrollLeft += scrollOffset;
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.keyCode === 37) {
                scroll(-200);
            }
            if (e.keyCode === 39) {
                scroll(200);
            }
        };

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    const changeViews = () => {
        if (view) {
            setButton({
                icon: "AutoStories",
                label: "View covers",
            });
            setView(false);
        } else {
            setButton({
                icon: "ViewColumn",
                label: "View shelf",
            });
            setView(true);
        }
    };

    const getBookCards = () => {
        let bookCards = [];
        let width = "12rem";
        for (let book of books) {
            if (view) {
                bookCards.push(<BookCard opacity="0.8" width={width} height="24rem" key={book?.bookId} book={book} />);
            } else {
                let bookWidth = "4rem";
                // if (book.pages) {
                //     bookWidth = `${8 * (book.pages / 400)}rem`;
                // }
                bookCards.push(
                    <BookSpineCard
                        expandedWidth={width}
                        spineWidth={bookWidth}
                        minHeight="24rem"
                        key={book?.bookId}
                        book={book}
                    />
                );
            }
        }
        return bookCards;
    };

    return (
        <Box>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Typography variant="h6">{title}</Typography>
                </Grid>

                <Grid item xs={6}>
                    <Stack direction="row" spacing={0.1} sx={{ paddingRight: 1.5, justifyContent: "end" }}>
                        <Tooltip title="Left">
                            <IconButton onClick={() => scroll(-200)} aria-label="Left">
                                <IconResolver iconName="NavigateBefore"></IconResolver>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Right">
                            <IconButton onClick={() => scroll(200)} aria-label="Right">
                                <IconResolver iconName="NavigateNext"></IconResolver>
                            </IconButton>
                        </Tooltip>
                        <Tooltip key={button.label} title={button.label}>
                            <IconButton onClick={changeViews} aria-label={button.label}>
                                <IconResolver iconName={button.icon}></IconResolver>
                            </IconButton>
                        </Tooltip>
                    </Stack>
                </Grid>
            </Grid>

            <Stack
                ref={carousel}
                sx={{
                    overflowX: "scroll",
                    scrollbarWidth: "none", // Hide the scrollbar for firefox
                    "&::-webkit-scrollbar": {
                        display: "none", // Hide the scrollbar for WebKit browsers (Chrome, Safari, Edge, etc.)
                    },
                    "&-ms-overflow-style:": {
                        display: "none", // Hide the scrollbar for IE
                    },
                }}
                direction="row"
                spacing={1.5}
            >
                {getBookCards()}
            </Stack>
        </Box>
    );
};
export default BookCarousel;
