import { Link } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ImportContactsIcon from "@mui/icons-material/ImportContacts";

import UserMenu from "@components/UserMenu";
import Search from "@components/Search";

const TopNavBar = ({ user }) => {
    return (
        <Box sx={{ margin: 0, padding: 0, display: "flex" }}>
            <AppBar component="nav" position="sticky">
                <Toolbar>
                    <IconButton
                        component={Link}
                        to="/"
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{ mr: 2 }}
                    >
                        <ImportContactsIcon />
                    </IconButton>
                    <Typography
                        variant="header"
                        noWrap
                        sx={{
                            flexGrow: 1,
                            display: { xs: "none", sm: "block" },
                        }}
                    >
                        Robinson
                    </Typography>

                    {user ? (
                        <>
                            <Search />
                            <UserMenu />
                        </>
                    ) : null}
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default TopNavBar;
