import { useRef, useState } from "react";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import { grey } from "@mui/material/colors";
import AddIcon from "@mui/icons-material/Add";
import ShelfDialog from "@dialogs/ShelfDialog";

const BookCarouselSkelton = ({ books = 20, height = "16rem" }) => {
    const carousel = useRef(null);

    const [hover, setHover] = useState(false);
    const [newShelfDialogOpen, setNewShelfDialogOpen] = useState(false);

    const handleNewShelf = (shelfId) => {
        console.log(shelfId);
    };

    const getBookCards = () => {
        const bookCards = [];
        for (let book = 0; book < books; book++) {
            bookCards.push(
                <Skeleton
                    sx={{ opacity: hover ? 0.3 : 0.6 }}
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
        <div
            style={{
                position: "relative",
            }}
        >
            <ShelfDialog
                onShelfChange={handleNewShelf}
                open={newShelfDialogOpen}
                setOpen={setNewShelfDialogOpen}
            />
            <Box
                ref={carousel}
                onMouseOver={() => {
                    setHover(true);
                }}
                onMouseOut={() => {
                    setHover(false);
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
                    <Grid item size={{ xs: 6 }}>
                        <Skeleton
                            sx={{ opacity: hover ? 0.3 : 0.6 }}
                            animation={false}
                            height={40}
                            width="18rem"
                        />
                    </Grid>

                    <Grid item size={{ xs: 6 }}>
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
                                sx={{ opacity: hover ? 0.3 : 0.6 }}
                                animation={false}
                                variant="circular"
                                width={30}
                                height={30}
                            />
                            <Skeleton
                                sx={{ opacity: hover ? 0.3 : 0.6 }}
                                animation={false}
                                variant="circular"
                                width={30}
                                height={30}
                            />
                            <Skeleton
                                sx={{ opacity: hover ? 0.3 : 0.6 }}
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
            <Box
                sx={{
                    zIndex: "drawer",
                    top: "50%",
                    position: "absolute",
                    left: "50%",
                    right: "0",
                    opacity: hover ? 0.9 : 0.6,
                }}
                onMouseOver={() => {
                    setHover(true);
                }}
                onMouseOut={() => {
                    setHover(false);
                }}
                onClick={() => setNewShelfDialogOpen(true)}
            >
                <AddIcon sx={{ fontSize: 50 }} />
                <br></br>
                <Typography variant="caption" align="center">
                    Add Shelf
                </Typography>
            </Box>
        </div>
    );
};
export default BookCarouselSkelton;
