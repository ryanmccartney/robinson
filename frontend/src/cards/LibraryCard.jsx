import { useRef, useState } from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import ImageList from "@mui/material/ImageList";

import Box from "@mui/material/Box";
import { Link } from "react-router-dom";

const LibraryCard = ({ library }) => {
    const [show, setShow] = useState(false);
    const media = useRef(null);
    const card = useRef(null);

    return (
        <Grid size={{ xs: 6, md: 3, lg: 2 }}>
            <Link
                style={{ textDecoration: "none" }}
                to={`/library/${library.id}`}
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
                            ></Box>
                        )}
                        <Box
                            sx={{
                                height: 300,
                                width: "100%",
                                zIndex: 1000,
                                position: "absolute",
                                top: 0,
                                left: 0,
                            }}
                        >
                            <ImageList
                                ref={media}
                                sx={{
                                    align: "center",
                                    height: 250,
                                    width: "90%",
                                }}
                                variant="masonry"
                                cols={3}
                                gap={8}
                            ></ImageList>

                            <CardContent>
                                <Typography variant="h6">
                                    {library.title}
                                </Typography>
                                <Typography variant="subtitle">
                                    {library.owner}
                                </Typography>
                            </CardContent>
                        </Box>
                    </Card>
                </Box>
            </Link>
        </Grid>
    );
};

export default LibraryCard;
