import { useEffect, useState, useRef } from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import { Link } from "react-router-dom";

import fetcher from "../utils/fetcher";

import SearchIcon from "@mui/icons-material/Search";
import ImportContactsIcon from "@mui/icons-material/ImportContacts";

import UserMenu from "./UserMenu";

const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(1),
        width: "auto",
    },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    width: "100%",
    "& .MuiInputBase-input": {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create("width"),
        [theme.breakpoints.up("sm")]: {
            width: "30ch",
            "&:focus": {
                width: "40ch",
            },
        },
    },
}));

const TopNavBar = ({ user }) => {
    const searchRef = useRef(null);
    const [,setData] = useState(null);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.keyCode === 191) {
                event.preventDefault();
                searchRef.current.focus();
            }
        };

        document.addEventListener("keydown", handleKeyDown);

        // Don't forget to clean up
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    const search = async (event) => {
        const data = await fetcher(`search?query=${event.target.value}`);
        setData(data);
    };

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
                            <Search>
                                <SearchIconWrapper>
                                    <SearchIcon />
                                </SearchIconWrapper>
                                <StyledInputBase
                                    inputRef={searchRef}
                                    placeholder="Press /"
                                    inputProps={{ "aria-label": "search" }}
                                    onChange={search}
                                />
                            </Search>

                            <UserMenu />
                        </>
                    ) : null}
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default TopNavBar;
