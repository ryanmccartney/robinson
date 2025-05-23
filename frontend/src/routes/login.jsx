import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";

import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import { UserContext } from "@contexts/user";
import fetcher from "@utils/fetcher";
import BreadcrumbsContext from "@contexts/breadcrumbs";

const Root = () => {
    const navigate = useNavigate();
    const { user, userMutate } = useContext(UserContext);
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");

    const { setBreadcrumbs } = useContext(BreadcrumbsContext);

    const setContexts = () => {
        setBreadcrumbs([{ title: "Login", link: `/login` }]);
    };

    const login = async () => {
        const data = await fetcher.post(`login`, {
            username,
            password,
        });
        if (data?.user) {
            enqueueSnackbar(
                `${data?.user?.firstName} ${data?.user?.lastName} logged in successfully`
            );
            userMutate(data?.user);
            navigate("/");
        }
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.keyCode === 13) {
                e.preventDefault();
                login();
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        setContexts();

        if (user) {
            setBreadcrumbs([]);
            navigate(-1);
        }

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [username, password]);

    return (
        <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            sx={{ m: 2, height: "70vh" }}
        >
            <Card>
                <Grid container sx={{ padding: 2 }} spacing={2}>
                    <Grid size={{ xs: 12, md: 12 }}>
                        <Typography variant="h4">Login</Typography>
                    </Grid>
                    <Grid size={{ xs: 12, md: 12 }}>
                        <TextField
                            onChange={(event) => {
                                setUsername(event.target.value);
                            }}
                            fullWidth
                            label="Username"
                            variant="outlined"
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 12 }}>
                        <TextField
                            onChange={(event) => {
                                setPassword(event.target.value);
                            }}
                            fullWidth
                            label="Password"
                            variant="outlined"
                            type="password"
                            autoComplete="current-password"
                        />
                    </Grid>
                    <Grid
                        size={{ xs: 12, md: 12 }}
                        direction="row"
                        alignItems="center"
                        justify="flex-end"
                    >
                        <Button onClick={login} variant="outlined">
                            Login
                        </Button>
                    </Grid>
                </Grid>
            </Card>
        </Stack>
    );
};
export default Root;
