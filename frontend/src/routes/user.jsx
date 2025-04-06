import { useState, useEffect, useContext } from "react";
import { useForm, Controller } from "react-hook-form";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Stack from "@mui/material/Stack";
import Select from "@mui/material/Select";

import LoadingContent from "@components/LoadingContent";
import BreadcrumbsContext from "@contexts/breadcrumbs";
import ButtonsContext from "@contexts/buttons";
import { UserContext } from "@contexts/user";
import UserAvatar from "@components/UserAvatar";
import fetcher from "@utils/fetcher";

const User = () => {
    const { user, userMutate, isUserLoading } = useContext(UserContext);
    const { setBreadcrumbs } = useContext(BreadcrumbsContext);
    const { setButtons } = useContext(ButtonsContext);

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        reset,
    } = useForm({ defaultValues: user });

    const [theme, setTheme] = useState("auto");

    const updateUser = async (updatedUser) => {
        const newData = await fetcher.put(`users/current`, updatedUser);
        userMutate(newData?.user);
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
                    link: `/user`,
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

    if (isUserLoading) {
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
                <Grid size={{ xs: 12, md: 4, lg: 6, xl: 6 }}>
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
                            <Grid size={{ xs: 12, md: 6 }}>
                                <TextField
                                    fullWidth
                                    {...register("firstName", {
                                        required: true,
                                    })}
                                    label="First Name"
                                    error={errors?.firstName}
                                    helperText={errors?.firstName?.message}
                                />
                            </Grid>

                            <Grid size={{ xs: 12, md: 6 }}>
                                <TextField
                                    fullWidth
                                    {...register("lastName", {
                                        required: true,
                                    })}
                                    label="Last Name"
                                    error={errors?.lastName}
                                    helperText={errors?.lastName?.message}
                                />
                            </Grid>

                            <Grid size={{ xs: 12, xl: 12 }}>
                                <TextField
                                    fullWidth
                                    {...register("email", {
                                        required: true,
                                    })}
                                    label="Email"
                                    error={errors?.email}
                                    helperText={errors?.email?.message}
                                />
                            </Grid>

                            <Grid size={{ xs: 12, xl: 12 }}>
                                <TextField
                                    fullWidth
                                    {...register("password", {
                                        minLength: {
                                            value: 8,
                                            message:
                                                "Password must be at least 8 characters",
                                        },
                                    })}
                                    type="password"
                                    label="Password"
                                    error={errors?.password}
                                    helperText={errors?.password?.message}
                                />
                            </Grid>

                            <Grid size={{ xs: 12, xl: 12 }}>
                                <FormControl fullWidth>
                                    <InputLabel id="role-select-label">
                                        Role
                                    </InputLabel>

                                    <Controller
                                        render={({
                                            field: { onChange, value },
                                        }) => (
                                            <Select
                                                onChange={onChange}
                                                value={value}
                                                label="Role"
                                                labelId="role-select-label"
                                                id="role-select"
                                                disabled={value !== "librarian"}
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
                                        )}
                                        control={control}
                                        name={"role"}
                                    />
                                </FormControl>
                            </Grid>

                            <Grid size={{ xs: 12, xl: 12 }}>
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

                        <CardActions sx={{ mt: 3, p: 0 }} disableSpacing>
                            <Stack
                                sx={{ ml: "auto" }}
                                direction="row"
                                spacing={2}
                            >
                                <Button
                                    onClick={() =>
                                        reset({}, { keepDefaultValues: true })
                                    }
                                    color="error"
                                    variant="outlined"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    onClick={handleSubmit(updateUser)}
                                    variant="outlined"
                                >
                                    Save Changes
                                </Button>
                            </Stack>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};
export default User;
