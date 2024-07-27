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

const LibraryMenu = ({ libraries }) => {
    const getLibraryItems = () => {
        const menuItems = [];

        Object.keys(libraries).forEach((id, index) => {
            menuItems.push(
                <MenuItem key={id} sx={{ padding: 1 }}>
                    <ListItemIcon>
                        <Avatar
                            sx={{ fontSize: "0.75rem", width: 24, height: 24, background: "secondary", opacity: 0.25 }}
                        >
                            {libraries[id].name}
                        </Avatar>
                    </ListItemIcon>
                    <ListItemText>{libraries[id].name}</ListItemText>
                </MenuItem>
            );
        });

        return menuItems;
    };

    return (
        <Paper sx={{ margin: 0, padding: 0, width: 320, maxWidth: "100%" }}>
            <MenuList>
                {getLibraryItems()}
                <Divider />
                <MenuItem sx={{ padding: 1 }}>
                    <ListItemIcon>
                        <AddCircleIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Add a Library</ListItemText>
                </MenuItem>
            </MenuList>
        </Paper>
    );
};

const LibrarySelector = () => {
    const [libraries, setLibraries] = useState([]);
    const [libraryId, setLibraryId] = useState();

    useEffect(() => {
        fetch(`/api/libraries`)
            .then((response) => response.json())
            .then((json) => setLibraries(json.data))
            .catch((error) => console.error(error));
    }, []);

    useEffect(() => {
        const libraryId = JSON.parse(localStorage.getItem("libraryId"));
        if (libraryId) {
            setLibraryId(libraryId);
        }
    }, []);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    let contents = (
        <>
            <Typography sx={{ padding: 1, flexGrow: 1 }}>Select a Library</Typography>
            <Avatar sx={{ background: "secondary", opacity: 0.25, fontSize: "1em" }}>? </Avatar>
        </>
    );

    if (libraryId) {
        contents = (
            <>
                <Typography sx={{ padding: 1, flexGrow: 1 }}>{libraries[libraryId].title}</Typography>
                <Avatar
                    src={libraries[libraryId].cover}
                    sx={{ background: "secondary", opacity: 0.25, fontSize: "1em" }}
                >
                    {libraries[libraryId].title}
                </Avatar>
            </>
        );
    }

    return (
        <Box
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            sx={{ padding: 1, display: "flex" }}
        >
            {contents}
            <Menu
                id="library-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    "aria-labelledby": "basic-button",
                }}
                sx={{ padding: 0, margin: 0 }}
            >
                <LibraryMenu libraries={libraries} />
            </Menu>
        </Box>
    );
};
export default LibrarySelector;
