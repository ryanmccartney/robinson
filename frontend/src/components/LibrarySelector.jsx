import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Menu from "@mui/material/Menu";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import AddCircleIcon from "@mui/icons-material/AddCircle";

import getInitials from "../utils/getInitials";

const LibraryMenu = ({ libraries = {}, callback }) => {
    const getLibraryItems = () => {
        const menuItems = [];

        Object.keys(libraries).forEach((id, index) => {
            menuItems.push(
                <MenuItem
                    onClick={() => callback(libraries[id].libraryId)}
                    key={id}
                >
                    <ListItemIcon>
                        <Avatar
                            sx={{
                                fontSize: "0.75rem",
                                width: 24,
                                height: 24,
                                background: "secondary",
                                opacity: 0.7,
                            }}
                        >
                            {getInitials(libraries[id].name)}
                        </Avatar>
                    </ListItemIcon>
                    <ListItemText>{libraries[id].name}</ListItemText>
                </MenuItem>
            );
        });

        return menuItems;
    };

    return (
        <MenuList>
            {getLibraryItems()}
            <Divider />
            <MenuItem>
                <ListItemIcon>
                    <AddCircleIcon fontSize="medium" />
                </ListItemIcon>
                <ListItemText>Add a Library</ListItemText>
            </MenuItem>
        </MenuList>
    );
};

const LibrarySelector = () => {
    const [data, setData] = useState(null);
    const [library, setLibrary] = useState(null);

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLibrarySelect = (newLibraryId) => {
        localStorage.setItem("libraryId", newLibraryId);
        if (newLibraryId) {
            for (const item of data.libraries) {
                if (item?.libraryId == newLibraryId) {
                    setLibrary(item);
                }
            }
        }
    };

    //On component Mount
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`/api/libraries`);
            const data = await response.json();
            setData(data);

            const libraryId = localStorage.getItem("libraryId");
            if (libraryId && data.libraries) {
                for (const item of data.libraries) {
                    if (item?.libraryId == libraryId) {
                        setLibrary(item);
                    }
                }
            }
        };
        fetchData();
    }, []);

    let contents;
    if (library && data) {
        contents = (
            <Box sx={{ display: "flex" }} onClick={handleClick}>
                <Typography
                    sx={{
                        display: { xs: "none", md: "block" },
                        padding: 1,
                        flexGrow: 1,
                    }}
                >
                    {library.name}
                </Typography>
                <Avatar
                    src={library.cover}
                    sx={{
                        background: "secondary",
                        opacity: 0.7,
                        fontSize: "1em",
                    }}
                >
                    {getInitials(library?.name)}
                </Avatar>
            </Box>
        );
    } else {
        contents = (
            <Box sx={{ display: "flex" }} onClick={handleClick}>
                <Typography
                    sx={{
                        display: { xs: "none", md: "block" },
                        padding: 1,
                        flexGrow: 1,
                    }}
                >
                    Select a Library
                </Typography>
                <Avatar
                    sx={{
                        background: "secondary",
                        opacity: 0.7,
                        fontSize: "1em",
                    }}
                >
                    ?
                </Avatar>
            </Box>
        );
    }

    if (!data) {
        return null;
    }

    return (
        <Box sx={{ padding: 1, display: "flex" }}>
            {contents}
            <Menu
                PaperProps={{
                    elevation: 0,
                    sx: {
                        width: "18rem",
                        maxWidth: "100%",
                        overflow: "visible",
                        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                        mt: 1.5,
                        "& .MuiAvatar-root": {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        "&::before": {
                            content: '""',
                            display: "block",
                            position: "absolute",
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: "background.paper",
                            transform: "translateY(-50%) rotate(45deg)",
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                <LibraryMenu
                    callback={handleLibrarySelect}
                    libraries={data?.libraries}
                />
            </Menu>
        </Box>
    );
};
export default LibrarySelector;
