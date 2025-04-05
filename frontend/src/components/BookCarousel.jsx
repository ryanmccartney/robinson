import { useState, useEffect, useRef } from "react";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import IconResolver from "./IconResolver";
import BookSpineCard from "@cards/BookSpineCard";
import BookCard from "@cards/BookCard";

const BookCarousel = ({ books = [], title, autoWidth }) => {
    const carousel = useRef(null);
    const component = useRef(null);

    const [view, setView] = useState(true);
    const [button, setButton] = useState({
        icon: "ViewColumn",
        label: "View shelf",
    });

    const scroll = (scrollOffset) => {
        carousel.current.scrollLeft += scrollOffset;
    };

    const handleKeyDown = (e) => {
        if (e.keyCode === 37) {
            scroll(-200);
        }
        if (e.keyCode === 39) {
            scroll(200);
        }
    };

    useEffect(() => {
        if (component && component?.current) {
            component?.current.addEventListener("keydown", handleKeyDown);
            return () => {
                if (component && component?.current) {
                    component?.current.removeEventListener(
                        "keydown",
                        handleKeyDown
                    );
                }
            };
        }
    }, [component]);

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
        const bookCards = [];
        const width = "12rem";
        for (const book of books) {
            if (view) {
                bookCards.push(
                    <BookCard
                        opacity="1"
                        width={width}
                        height="24rem"
                        key={book?.bookId}
                        book={book}
                    />
                );
            } else {
                //Set the book width when in spine mode
                let bookWidth = "4rem";
                if (book.pages && autoWidth) {
                    let width = 0.9 * (book.pages / 100);
                    if (width > 8) {
                        width = 8;
                    }
                    bookWidth = `${width}rem`;
                }

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
        <Box ref={component}>
            <Grid container spacing={2}>
                <Grid size={{ xs: 6 }}>
                    <Typography variant="h6">{title}</Typography>
                </Grid>

                <Grid size={{ xs: 6 }}>
                    <Stack
                        direction="row"
                        spacing={0.1}
                        sx={{ paddingRight: 1.5, justifyContent: "end" }}
                    >
                        <Tooltip title="Left">
                            <IconButton
                                onClick={() => scroll(-200)}
                                aria-label="Left"
                            >
                                <IconResolver iconName="NavigateBefore"></IconResolver>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Right">
                            <IconButton
                                onClick={() => scroll(200)}
                                aria-label="Right"
                            >
                                <IconResolver iconName="NavigateNext"></IconResolver>
                            </IconButton>
                        </Tooltip>
                        <Tooltip key={button.label} title={button.label}>
                            <IconButton
                                onClick={changeViews}
                                aria-label={button.label}
                            >
                                <IconResolver
                                    iconName={button.icon}
                                ></IconResolver>
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
