import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";

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
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";

import fetcher from "@utils/fetcher";
import { UserContext } from "@contexts/user";
import UserAvatar from "@components/UserAvatar";

const MenuContents = ({ close }) => {
    const navigate = useNavigate();
    const { user, userMutate } = useContext(UserContext);

    const items = [];

    const logout = async () => {
        const data = await fetcher.post("logout");
        enqueueSnackbar(
            `${data?.user?.firstName} ${data?.user?.lastName} logged out.`
        );
        userMutate(null);
        navigate("/");
    };

    const login = async () => {
        close();
        navigate("/login");
    };

    const users = async () => {
        close();
        navigate(`/users`);
    };

    const edit = async () => {
        close();
        navigate(`/user`);
    };

    if (user) {
        items.push(
            <MenuItem key="edit-accounts" onClick={edit}>
                <ListItemIcon>
                    <EditIcon fontSize="medium" />
                </ListItemIcon>
                <ListItemText>Edit Account</ListItemText>
            </MenuItem>
        );

        if (user.role === "librarian") {
            items.push(
                <MenuItem key="edit-users" onClick={users}>
                    <ListItemIcon>
                        <PeopleOutlineIcon fontSize="medium" />
                    </ListItemIcon>
                    <ListItemText>Edit Users</ListItemText>
                </MenuItem>
            );
        }

        items.push(
            <MenuItem key="logout" onClick={logout}>
                <ListItemIcon>
                    <LogoutIcon fontSize="medium" />
                </ListItemIcon>
                <ListItemText>Logout</ListItemText>
            </MenuItem>
        );
    } else {
        items.push(
            <MenuItem key="login" onClick={login}>
                <ListItemIcon>
                    <LoginIcon fontSize="medium" />
                </ListItemIcon>
                <ListItemText>Login</ListItemText>
            </MenuItem>
        );
    }

    return <MenuList>{items}</MenuList>;
};

const UserMenu = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const { user } = useContext(UserContext);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    let contents;
    if (user) {
        contents = (
            <Box sx={{ display: "flex" }} onClick={handleClick}>
                <Typography
                    sx={{
                        display: { xs: "none", md: "block" },
                        padding: 1,
                        flexGrow: 1,
                    }}
                >
                    {`${user?.firstName} ${user?.lastName}`}
                </Typography>
                <UserAvatar user={user} />
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
                    No User
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
                <MenuContents close={handleClose} />
            </Menu>
        </Box>
    );
};
export default UserMenu;
