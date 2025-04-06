import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";

import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

import UserDialog from "@dialogs/UserDialog";
import UserAvatar from "@components/UserAvatar";
import LoadingContent from "@components/LoadingContent";
import BreadcrumbsContext from "@contexts/breadcrumbs";
import ButtonsContext from "@contexts/buttons";
import fetcher from "@utils/fetcher";
import { useUsers } from "@utils/data";
import { UserContext } from "@contexts/user";

const User = () => {
    const navigate = useNavigate();
    const [userDialogOpen, setUserDialogOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const { users, isUsersLoading, usersMutate } = useUsers();
    const { user, isUserLoading } = useContext(UserContext);

    const { setBreadcrumbs } = useContext(BreadcrumbsContext);
    const { setButtons } = useContext(ButtonsContext);

    const handleNewUser = async (data) => {
        const response = await fetcher.post(`users`, data);
        if (response.user) {
            enqueueSnackbar(
                `Created a new user ${data.firstName} ${data.lastName}`
            );
            setUserDialogOpen(false);
            usersMutate();
        }
    };

    const handleUpdatedUser = async (data) => {
        const response = await fetcher.put(`users/${data.userId}`, data);
        if (response.user) {
            enqueueSnackbar(`Updated ${data.firstName} ${data.lastName}`);
            setUserDialogOpen(false);
            usersMutate();
        }
    };

    const handleDeleteUser = async (data) => {
        const response = await fetcher.delete(`users/${data.userId}`);
        if (response.user) {
            enqueueSnackbar(`Deleted ${data.firstName} ${data.lastName}`);
            usersMutate();
        }
    };

    const setContexts = () => {
        setBreadcrumbs([
            { title: "Home", link: `/` },
            { title: "Users", link: `/users` },
        ]);
    };

    useEffect(() => {
        setContexts();
        return () => {
            setBreadcrumbs([]);
            setButtons([]);
        };
    }, [user]);

    if (isUsersLoading || isUserLoading) {
        return <LoadingContent />;
    }

    if (user?.role !== "librarian") {
        navigate(`/`);
        return <LoadingContent />;
    }

    return (
        <Box sx={{ m: 2 }}>
            <UserDialog
                onUserNew={handleNewUser}
                onUserUpdate={handleUpdatedUser}
                setOpen={setUserDialogOpen}
                open={userDialogOpen}
                user={selectedUser}
            />

            <Typography gutterBottom variant="h4">
                Users
            </Typography>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="right"></TableCell>
                            <TableCell align="left">First Name</TableCell>
                            <TableCell align="left">Last Name</TableCell>
                            <TableCell align="left">Email</TableCell>
                            <TableCell align="left">Role</TableCell>
                            <TableCell align="center">Enabled</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((row) => (
                            <TableRow
                                key={row.userId}
                                sx={{
                                    "&:last-child td, &:last-child th": {
                                        border: 0,
                                    },
                                }}
                            >
                                <TableCell align="right">
                                    <UserAvatar user={row} />
                                </TableCell>
                                <TableCell align="left">
                                    {row.firstName}
                                </TableCell>
                                <TableCell align="left">
                                    {row.lastName}
                                </TableCell>
                                <TableCell align="left">{row.email}</TableCell>
                                <TableCell align="left">{row.role}</TableCell>
                                <TableCell align="center">
                                    <Checkbox
                                        checked={row.enabled}
                                        onClick={(event) => {
                                            handleUpdatedUser({
                                                enabled: event.target.checked,
                                                userId: row.userId,
                                            });
                                        }}
                                    />
                                </TableCell>
                                <TableCell align="right">
                                    <Stack
                                        direction="row"
                                        spacing={0.5}
                                        sx={{
                                            justifyContent: "flex-end",
                                            alignItems: "center",
                                        }}
                                    >
                                        <IconButton
                                            aria-label="delete"
                                            size="medium"
                                            onClick={() => {
                                                setSelectedUser(row);
                                                setUserDialogOpen(true);
                                            }}
                                        >
                                            <EditIcon fontSize="inherit" />
                                        </IconButton>
                                        <IconButton
                                            aria-label="delete"
                                            size="medium"
                                            onClick={() => {
                                                handleDeleteUser(row);
                                            }}
                                        >
                                            <DeleteIcon fontSize="inherit" />
                                        </IconButton>
                                    </Stack>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Button
                sx={{ ml: "auto", mt: 3 }}
                onClick={() => {
                    setSelectedUser(null);
                    setUserDialogOpen(true);
                }}
                variant="outlined"
            >
                Add User
            </Button>
        </Box>
    );
};
export default User;
