import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import sha256 from "crypto-js/sha256";
import cookie from "cookie";

import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import EditIcon from "@mui/icons-material/Edit";

import getInitials from "../utils/getInitials";
import fetcher from "./../utils/fetcher";
import { UserContext } from "../contexts/user";

const MenuContents = () => {
    const navigate = useNavigate();
    const { user, setUser } = useContext(UserContext);

    const logout = async () => {
        const data = await fetcher("logout", "POST");
        enqueueSnackbar(`${data?.user?.firstName} ${data?.user?.lastName} logged out.`);
        setUser(null);
    };

    const login = async () => {
        navigate("/login");
    };

    const edit = async () => {};

    if (user) {
        return (
            <MenuList>
                <MenuItem onClick={edit}>
                    <ListItemIcon>
                        <EditIcon fontSize="medium" />
                    </ListItemIcon>
                    <ListItemText>Edit Account</ListItemText>
                </MenuItem>
                <MenuItem onClick={logout}>
                    <ListItemIcon>
                        <LogoutIcon fontSize="medium" />
                    </ListItemIcon>
                    <ListItemText>Logout</ListItemText>
                </MenuItem>
            </MenuList>
        );
    } else {
        return (
            <MenuList>
                <MenuItem onClick={login}>
                    <ListItemIcon>
                        <LoginIcon fontSize="medium" />
                    </ListItemIcon>
                    <ListItemText>Login</ListItemText>
                </MenuItem>
            </MenuList>
        );
    }
};

const UserMenu = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const { user, setUser } = useContext(UserContext);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    let contents;
    if (user) {
        const hash = sha256(user?.email);

        contents = (
            <Box sx={{ display: "flex" }} onClick={handleClick}>
                <Typography sx={{ display: { xs: "none", md: "block" }, padding: 1, flexGrow: 1 }}>
                    {`${user?.firstName} ${user?.lastName}`}
                </Typography>
                <Avatar
                    src={`https://gravatar.com/avatar/${hash}?s=200`}
                    sx={{ background: "secondary", opacity: 1, fontSize: "1em" }}
                >
                    {getInitials(`${user?.firstName} ${user?.lastName}`)}
                </Avatar>
            </Box>
        );
    } else {
        contents = (
            <Box sx={{ display: "flex" }} onClick={handleClick}>
                <Typography sx={{ display: { xs: "none", md: "block" }, padding: 1, flexGrow: 1 }}>No User</Typography>
                <Avatar sx={{ background: "secondary", opacity: 0.7, fontSize: "1em" }}>?</Avatar>
            </Box>
        );
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
                <MenuContents />
            </Menu>
        </Box>
    );
};
export default UserMenu;
