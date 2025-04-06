import { useForm, Controller } from "react-hook-form";

import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
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

const UserDialog = ({ onUserNew, onUserUpdate, open, setOpen, user }) => {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        reset,
    } = useForm({ defaultValues: user });

    const submitForm = (data) => {
        user ? onUserUpdate(data) : onUserNew(data);
    };

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={() => {
                setOpen(false);
            }}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
                backdrop: {
                    timeout: 500,
                },
            }}
        >
            <Fade in={open}>
                <Card
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: "60%",
                        boxShadow: 24,
                        p: 2,
                    }}
                >
                    <Typography align="center" variant="h5" gutterBottom>
                        Add User
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
                                {...register("username", {
                                    required: true,
                                })}
                                label="Username"
                                error={errors?.username}
                                helperText={errors?.username?.message}
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
                    </Grid>

                    <CardActions sx={{ mt: 3, p: 0 }} disableSpacing>
                        <Stack sx={{ ml: "auto" }} direction="row" spacing={2}>
                            <Button
                                onClick={() => {
                                    reset({}, { keepDefaultValues: true });
                                    setOpen(false);
                                }}
                                color="error"
                                variant="outlined"
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={handleSubmit(submitForm)}
                                variant="outlined"
                            >
                                Save Changes
                            </Button>
                        </Stack>
                    </CardActions>
                </Card>
            </Fade>
        </Modal>
    );
};

export default UserDialog;
