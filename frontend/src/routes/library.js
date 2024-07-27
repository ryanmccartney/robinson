import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useParams } from "react-router-dom";

const Library = () => {
    const { libraryId } = useParams();
    const [library, setLibrary] = useState({});

    useEffect(() => {
        fetch(`/api/libraries/${libraryId}`)
            .then((response) => response.json())
            .then((json) => setLibrary(json.data))
            .catch((error) => console.error(error));
    }, []);

    return (
        <>
            <Grid container spacing={4}>
                <Grid item align="center" xs={12} md={4} lg={6}>
                    <Box
                        component="img"
                        sx={{
                            minWidth: "50%",
                            maxWidth: "80%",
                        }}
                        alt={`${library.title} Cover`}
                        src={library?.cover}
                    />
                </Grid>

                <Grid item xs={12} md={8} lg={6}>
                    <Typography gutterBottom variant="h4">
                        {library.title}
                    </Typography>

                    <Typography gutterBottom variant="body2">
                        {library.description}
                    </Typography>

                    <Typography gutterBottom variant="h5">
                        Details
                    </Typography>

                    <Grid
                        container
                        spacing={2}
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="flex-start"
                    ></Grid>
                </Grid>
            </Grid>
        </>
    );
};
export default Library;
