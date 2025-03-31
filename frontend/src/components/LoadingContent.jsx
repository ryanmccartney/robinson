import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { grey } from "@mui/material/colors";

import getLoadingPhrase from "./../utils/getLoadingPhrase";

const LoadingContent = ({ title, noTitle = false }) => {
    let message = "";

    if (title) {
        message = title;
    } else {
        message = getLoadingPhrase();
    }
    if (noTitle) {
        message = "";
    }

    return (
        <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            sx={{ width: 1, height: "75vh" }}
        >
            <CircularProgress sx={{ margin: 1 }} />
            <Typography
                sx={{ margin: 1 }}
                color={grey[500]}
                variant="subtitle1"
            >
                {message}
            </Typography>
        </Stack>
    );
};

export default LoadingContent;
