import { useRouteError, isRouteErrorResponse } from "react-router-dom";
import React, { useEffect, useContext } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import BreadcrumbsContext from "./../contexts/breadcrumbs";
import { grey } from "@mui/material/colors";

const Error = () => {
    const { breadcrumbs, setBreadcrumbs } = useContext(BreadcrumbsContext);
    //const error = useRouteError();

    const setContexts = () => {
        setBreadcrumbs([{ title: "Home", link: `/` }]);
    };

    //On component Mount
    useEffect(() => {
        setContexts();
    }, []);

    //On component Unmount (cleanup)
    useEffect(() => {
        return () => {
            setBreadcrumbs([]);
        };
    }, []);

    const errorMessage = "";

    // if (isRouteErrorResponse(error)) {
    //     // error is type `ErrorResponse`
    //     errorMessage = error.error?.message || error.statusText;
    // } else if (error instanceof Error) {
    //     errorMessage = error.message;
    // } else if (typeof error === "string") {
    //     errorMessage = error;
    // } else {
    //     console.error(error);
    //     errorMessage = "Unknown error";
    // }

    return (
        <Stack direction="column" justifyContent="center" alignItems="center" sx={{ m: 2, width: 1, height: "75vh" }}>
            <Typography sx={{ margin: 1 }} color={grey[500]} variant="h2">
                Error
            </Typography>
            <Typography sx={{ margin: 1 }} color={grey[500]} variant="h4">
                Page can't be found
            </Typography>

            <Typography sx={{ margin: 1 }} color={grey[500]} variant="subtitle">
                {errorMessage}
            </Typography>

            {/* <Typography variant="body1">{error.statusText || error.message}</Typography> */}
            <Button sx={{ margin: 1, color: grey[500], borderColor: grey[600] }} variant="outlined" href="/">
                Home
            </Button>
        </Stack>
    );
};

export default Error;
