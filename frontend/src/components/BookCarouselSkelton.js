import React, { useRef, useState } from "react";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Skeleton from "@mui/material/Skeleton";
import { grey } from "@mui/material/colors";

const BookCarouselSkelton = ({ books = 20, height = "16rem" }) => {
    const carousel = useRef(null);
    const [opacity, setOpacity] = useState(1.0);

    const getBookCards = () => {
        const bookCards = [];
        for (let book = 0; book < books; book++) {
            bookCards.push(
                <Skeleton
                    sx={{ opacity: opacity }}
                    variant="rectangular"
                    width="4rem"
                    height={height}
                    key={book}
                    animation={false}
                />
            );
        }
        return bookCards;
    };

    return (
        <Box
            ref={carousel}
            onMouseOver={() => {
                setOpacity(0.4);
            }}
            onMouseOut={() => {
                setOpacity(1.0);
            }}
            sx={{
                width: "100%",
                margin: 0.5,
                padding: 1.5,
                border: 1,
                borderRadius: 1,
                borderColor: grey[500],
            }}
        >
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Skeleton
                        sx={{ opacity: opacity }}
                        animation={false}
                        height={40}
                        width="18rem"
                    />
                </Grid>

                <Grid item xs={6}>
                    <Stack
                        direction="row"
                        spacing={1.5}
                        sx={{
                            paddingLeft: 1,
                            paddingTop: 1,
                            paddingBottom: 1,
                            justifyContent: "end",
                        }}
                    >
                        <Skeleton
                            sx={{ opacity: opacity }}
                            animation={false}
                            variant="circular"
                            width={30}
                            height={30}
                        />
                        <Skeleton
                            sx={{ opacity: opacity }}
                            animation={false}
                            variant="circular"
                            width={30}
                            height={30}
                        />
                        <Skeleton
                            sx={{ opacity: opacity }}
                            animation={false}
                            variant="circular"
                            width={30}
                            height={30}
                        />
                    </Stack>
                </Grid>
            </Grid>

            <Stack
                sx={{
                    overflowX: "hidden",
                }}
                direction="row"
                spacing={1.5}
            >
                {getBookCards()}
            </Stack>
        </Box>
    );
};
export default BookCarouselSkelton;
