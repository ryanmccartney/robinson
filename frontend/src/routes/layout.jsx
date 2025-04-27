import { useContext } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Outlet } from "react-router-dom";
import TopNavBar from "@components/TopNavBar";
import BottomNavBar from "@components/BottomNavBar";
import { UserContext } from "@contexts/user";

import LayoutBreadcrumbs from "@components/LayoutBreadcrumbs";
import LayoutButtons from "@components/LayoutButtons";

const Layout = () => {
    const { user } = useContext(UserContext);

    return (
        <>
            <TopNavBar user={user} />

            <Box sx={{ pb: 7, m: 0 }}>
                <Grid container spacing={0}>
                    <Grid size={{ xs: 9 }}>
                        <LayoutBreadcrumbs />
                    </Grid>
                    <Grid
                        size={{ xs: 3 }}
                        alignItems="flex-end"
                        justify="flex-end"
                        sx={{ justifyContent: "end" }}
                    >
                        <LayoutButtons />
                    </Grid>
                </Grid>

                <Outlet />
            </Box>
            {user ? <BottomNavBar /> : null}
        </>
    );
};

export default Layout;
