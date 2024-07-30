import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Outlet } from "react-router-dom";
import TopNavBar from "../TopNavBar";
import BottomNavBar from "../BottomNavBar";
import CssBaseline from "@mui/material/CssBaseline";

import LayoutBreadcrumbs from "../components/LayoutBreadcrumbs";
import LayoutButtons from "../components/LayoutButtons";

const Layout = () => {
    return (
        <>
            <CssBaseline />
            <TopNavBar />

            <Box sx={{ pb: 7, m: 2 }}>
                <Grid container justify="flex-end" spacing={0}>
                    <Grid item xs={9}>
                        <LayoutBreadcrumbs />
                    </Grid>
                    <Grid item xs={3} alignItems="flex-end" justify="flex-end">
                        <LayoutButtons />
                    </Grid>
                </Grid>

                <Outlet />
            </Box>
            <BottomNavBar />
        </>
    );
};

export default Layout;
