import { useState, useEffect, useContext } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

import Select from "@mui/material/Select";
import { useNavigate } from "react-router-dom";

import LoadingContent from "@components/LoadingContent";
import BreadcrumbsContext from "@contexts/breadcrumbs";
import ButtonsContext from "@contexts/buttons";

import { UserContext } from "@contexts/user";
import UserAvatar from "@components/UserAvatar";
import fetcher from "@utils/fetcher";

const User = () => {
    const navigate = useNavigate();

    const { user, setUser } = useContext(UserContext);
    const { setBreadcrumbs } = useContext(BreadcrumbsContext);
    const { setButtons } = useContext(ButtonsContext);

    const [theme, setTheme] = useState("auto");

    const updateUser = async (key, data) => {
        const newData = await fetcher.put(`users/current`, { [key]: data });
        setUser(newData?.user);
    };

    const handleTheme = (event) => {
        localStorage.setItem("theme", event.target.value);
        setTheme(event.target.value);
        location.reload();
    };

    const setContexts = (user) => {
        if (user) {
            setBreadcrumbs([
                { title: "Home", link: `/` },
                { title: "Users", link: `/users` },
                {
                    title:
                        user?.firstName && user?.lastName
                            ? `${user?.firstName} ${user?.lastName}`
                            : user?.username,
                    link: `/user/${user?.userId}`,
                },
            ]);
        }
    };

    //On component Mount
    useEffect(() => {
        setTheme(localStorage.getItem("theme"));
        setContexts(user);
        return () => {
            setBreadcrumbs([]);
            setButtons([]);
        };
    }, [user]);

    if (!user) {
        return <LoadingContent />;
    }

    if (!user.userId) {
        navigate(`/`);
        return <LoadingContent />;
    }

    return (
        <Box sx={{ m: 2 }}>
            <Grid
                container
                alignItems="center"
                justifyContent="center"
                spacing={3}
            >
                <Grid item size={{ xs: 12, md: 4, lg: 6, xl: 6 }}>
                    <Card
                        sx={{ marginTop: 6, padding: 3, overflow: "visible" }}
                    >
                        <Box
                            sx={{ position: "relative", top: "-4rem" }}
                            align="center"
                        >
                            <UserAvatar
                                user={user}
                                sx={{ width: "6.5rem", height: "6.5rem" }}
                            />
                        </Box>
                        <Typography
                            sx={{ position: "relative", top: "-2rem" }}
                            align="center"
                            variant="h4"
                        >
                            Account Details
                        </Typography>

                        <Grid
                            container
                            alignItems="center"
                            justifyContent="center"
                            spacing={3}
                        >
                            <Grid item size={{ xs: 12, md: 6 }}>
                                <TextField
                                    fullWidth
                                    value={user?.firstName}
                                    label="First Name"
                                    onChange={(e) =>
                                        updateUser("firstName", e.target.value)
                                    }
                                />
                            </Grid>

                            <Grid item size={{ xs: 12, md: 6 }}>
                                <TextField
                                    fullWidth
                                    value={user?.lastName}
                                    label="Last Name"
                                    onChange={(e) =>
                                        updateUser("lastName", e.target.value)
                                    }
                                />
                            </Grid>

                            <Grid item size={{ xs: 12, xl: 12 }}>
                                <TextField
                                    fullWidth
                                    value={user?.email}
                                    label="Email"
                                    onChange={(e) =>
                                        updateUser("email", e.target.value)
                                    }
                                />
                            </Grid>

                            <Grid item size={{ xs: 12, xl: 12 }}>
                                <TextField
                                    fullWidth
                                    value="12345678"
                                    type="password"
                                    label="Password"
                                    onChange={(e) =>
                                        updateUser("password", e.target.value)
                                    }
                                />
                            </Grid>

                            <Grid item size={{ xs: 12, xl: 12 }}>
                                <FormControl fullWidth>
                                    <InputLabel id="role-select-label">
                                        Role
                                    </InputLabel>
                                    <Select
                                        label="Role"
                                        labelId="role-select-label"
                                        id="role-select"
                                        disabled={
                                            user?.role === "librarian"
                                                ? false
                                                : true
                                        }
                                        value={user?.role}
                                        onChange={(e) =>
                                            updateUser("role", e.target.value)
                                        }
                                    >
                                        <MenuItem value={"librarian"}>
                                            Librarian
                                        </MenuItem>
                                        <MenuItem value={"curator"}>
                                            Curator
                                        </MenuItem>
                                        <MenuItem value={"member"}>
                                            Member
                                        </MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item size={{ xs: 12, xl: 12 }}>
                                <FormControl fullWidth>
                                    <InputLabel id="theme-select-label">
                                        Theme
                                    </InputLabel>
                                    <Select
                                        label="Theme"
                                        labelId="theme-select-label"
                                        id="theme-select"
                                        value={theme}
                                        onChange={handleTheme}
                                    >
                                        <MenuItem value={"dark"}>Dark</MenuItem>
                                        <MenuItem value={"light"}>
                                            Light
                                        </MenuItem>
                                        <MenuItem value={"auto"}>
                                            System
                                        </MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};
export default User;
