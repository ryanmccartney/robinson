import { useEffect, useContext } from "react";
import { enqueueSnackbar } from "notistack";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";

import fetcher from "@utils/fetcher";
import BreadcrumbsContext from "@contexts/breadcrumbs";

const Settings = () => {
    const { setBreadcrumbs } = useContext(BreadcrumbsContext);

    useEffect(() => {
        setBreadcrumbs([
            { title: "Home", link: `/` },
            { title: "Settings", link: `/settings` },
        ]);
        return () => {
            setBreadcrumbs([]);
        };
    }, []);

    const organise = async (felid = "title") => {
        await fetcher.post(`organise/${felid}`);
        enqueueSnackbar(`Organising books by ${felid}`);
    };

    return (
        <Box sx={{ m: 2 }}>
            <Grid
                container
                alignItems="center"
                justifyContent="center"
                spacing={3}
            >
                <Grid size={{ xs: 12, sm: 10, md: 8, lg: 6, xl: 6 }}>
                    <Card sx={{ padding: 3, overflow: "visible" }}>
                        <Typography align="center" variant="h4" gutterBottom>
                            Settings
                        </Typography>

                        <Typography
                            align="center"
                            gutterBottom
                            sx={{ fontSize: "0.9rem", mb: 2 }}
                        >
                            Version: v{__APP_VERSION__}
                        </Typography>

                        <Typography
                            sx={{ fontSize: "0.9rem", mb: 2 }}
                            align="justify"
                            variant="body1"
                        >
                            {
                                "Robinson is a self-hosted book management for your physical and virtual library. Add your bookcases, shelves and books. View the source could or contribute on "
                            }
                            <Link
                                href="https://github.com/ryanmccartney/robinson"
                                underline="hover"
                            >
                                GitHub
                            </Link>
                            {", or take a look at the "}
                            <Link
                                href="https://ryan.mccartney.info/robinson/"
                                underline="hover"
                            >
                                Documentation
                            </Link>
                            {"."}
                        </Typography>

                        <Typography align="left" variant="h6" gutterBottom>
                            Name
                        </Typography>

                        <Typography
                            sx={{ fontSize: "0.9rem", mb: 2 }}
                            align="justify"
                            variant="body1"
                        >
                            {"Robinson shares it's name with the "}
                            <Link
                                href="https://en.wikipedia.org/wiki/Armagh_Robinson_Library"
                                underline="hover"
                            >
                                Armagh Robinson Library
                            </Link>
                            {" notable for it's collection of "}
                            <Link
                                href="https://en.wikipedia.org/wiki/Jonathan_Swift"
                                underline="hover"
                            >
                                Jonathan Swift
                            </Link>
                            {"'s works. Including an annotated copy of "}
                            <Link
                                href="https://en.wikipedia.org/wiki/Gulliver%27s_Travels"
                                underline="hover"
                            >
                                {"Gulliver's Travels"}
                            </Link>
                            {"."}
                        </Typography>

                        <Typography align="left" variant="h6" sx={{ mb: 2 }}>
                            Organise
                        </Typography>

                        <Grid
                            container
                            spacing={2}
                            direction="row"
                            justifyContent="flex-start"
                            alignItems="flex-start"
                        >
                            <Grid size={{ xs: 8 }} sx={{ margin: "auto" }}>
                                <Typography
                                    fontWeight="fontWeightMedium"
                                    variant="body1"
                                    sx={{ fontSize: "0.9rem" }}
                                >
                                    Books by titles
                                </Typography>

                                <Typography variant="caption">
                                    Reassign all books to a shelf by
                                    alphabetical order of the title
                                </Typography>
                            </Grid>
                            <Grid
                                size={{ right: 0, xs: 4 }}
                                style={{ textAlign: "right" }}
                                sx={{ margin: "auto" }}
                            >
                                <Button
                                    color="error"
                                    variant="outlined"
                                    onClick={() => {
                                        organise("title");
                                    }}
                                >
                                    Organise
                                </Button>
                            </Grid>

                            <Grid size={{ xs: 8 }} sx={{ margin: "auto" }}>
                                <Typography
                                    fontWeight="fontWeightMedium"
                                    variant="body1"
                                    sx={{ fontSize: "0.9rem" }}
                                >
                                    Books by authors
                                </Typography>

                                <Typography variant="caption">
                                    Reassign all books to a shelf by
                                    alphabetical order of the author
                                </Typography>
                            </Grid>
                            <Grid
                                size={{ right: 0, xs: 4 }}
                                style={{ textAlign: "right" }}
                                sx={{ margin: "auto" }}
                            >
                                <Button
                                    color="error"
                                    variant="outlined"
                                    onClick={() => {
                                        organise("author");
                                    }}
                                >
                                    Organise
                                </Button>
                            </Grid>

                            <Grid size={{ xs: 8 }} sx={{ margin: "auto" }}>
                                <Typography
                                    fontWeight="fontWeightMedium"
                                    variant="body1"
                                    sx={{ fontSize: "0.9rem" }}
                                >
                                    Books by pages
                                </Typography>

                                <Typography variant="caption">
                                    Reassign all books to a shelf by the number
                                    of pages
                                </Typography>
                            </Grid>
                            <Grid
                                size={{ right: 0, xs: 4 }}
                                style={{ textAlign: "right" }}
                                sx={{ margin: "auto" }}
                            >
                                <Button
                                    color="error"
                                    variant="outlined"
                                    onClick={() => {
                                        organise("pages");
                                    }}
                                >
                                    Organise
                                </Button>
                            </Grid>

                            <Grid size={{ xs: 8 }} sx={{ margin: "auto" }}>
                                <Typography
                                    fontWeight="fontWeightMedium"
                                    variant="body1"
                                    sx={{ fontSize: "0.9rem" }}
                                >
                                    Books by cover colors
                                </Typography>

                                <Typography variant="caption">
                                    Reassign all books to shelves based on the
                                    color of their cover
                                </Typography>
                            </Grid>
                            <Grid
                                size={{ right: 0, xs: 4 }}
                                style={{ textAlign: "right" }}
                                sx={{ margin: "auto" }}
                            >
                                <Button
                                    color="error"
                                    variant="outlined"
                                    onClick={() => {
                                        organise("color");
                                    }}
                                >
                                    Organise
                                </Button>
                            </Grid>
                        </Grid>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};
export default Settings;
