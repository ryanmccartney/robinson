import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useParams } from "react-router-dom";
import { cases } from "../tests/data";

const Case = () => {
    const { caseId } = useParams();
    const [bookcase, setBookcase] = useState({});

    useEffect(() => {
        fetch(`/api/cases/${caseId}`)
            .then((response) => response.json())
            .then((json) => setBookcase(json.cases))
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
                        alt={`${bookcase.title} Cover`}
                        src={bookcase?.cover}
                    />
                </Grid>

                <Grid item xs={12} md={8} lg={6}>
                    <Typography gutterBottom variant="h4">
                        {bookcase.title}
                    </Typography>

                    <Typography gutterBottom variant="body2">
                        {bookcase.description}
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
export default Case;
