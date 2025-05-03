import { useEffect, useContext } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import BreadcrumbsContext from "@contexts/breadcrumbs";
import Box from "@mui/material/Box";
import { grey } from "@mui/material/colors";

const Error = () => {
    const { setBreadcrumbs } = useContext(BreadcrumbsContext);
    //const error = useRouteError();

    useEffect(() => {
        setBreadcrumbs([{ title: "Home", link: `/` }]);
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
        <Box sx={{ m: 2 }}>
            <Stack
                direction="column"
                justifyContent="center"
                alignItems="center"
                sx={{ m: 2, width: 1, height: "70vh" }}
            >
                <Typography
                    align="center"
                    sx={{ margin: 1 }}
                    color={grey[500]}
                    variant="h2"
                >
                    Error
                </Typography>
                <Typography
                    align="center"
                    sx={{ margin: 1 }}
                    color={grey[500]}
                    variant="h4"
                >
                    {"Page can't be found"}
                </Typography>

                <Typography
                    align="center"
                    sx={{ margin: 1 }}
                    color={grey[500]}
                    variant="subtitle"
                >
                    {errorMessage}
                </Typography>

                <Button
                    sx={{ margin: 1, color: grey[500], borderColor: grey[600] }}
                    variant="outlined"
                    href="/"
                >
                    Home
                </Button>
            </Stack>
        </Box>
    );
};

export default Error;
