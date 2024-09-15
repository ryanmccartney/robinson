import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import fetcher from "./../utils/fetcher";

import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Checkbox from '@mui/material/Checkbox';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';

import LoadingContent from "../components/LoadingContent";
import BreadcrumbsContext from "../contexts/breadcrumbs";
import ButtonsContext from "../contexts/buttons";

import { UserContext } from "../contexts/user";

import UserAvatar from "../components/UserAvatar";
import EditableTypography from "../components/EditableTypography";

const User = () => {
    const navigate = useNavigate();
    const [data, setData] = useState(null);

    const { user, setUser } = useContext(UserContext);
    const { breadcrumbs, setBreadcrumbs } = useContext(BreadcrumbsContext);
    const { buttons, setButtons } = useContext(ButtonsContext);

    const setContexts = (user) => {
        if (user) {
            setBreadcrumbs([
                { title: "Home", link: `/` },
                { title: "Users", link: `/users` },
            ]);
        }
    };

    //On component Mount
    useEffect(() => {
        const fetchData = async () => {
            setData(await fetcher(`users`));
            setContexts(user);
        };
        fetchData();
        return () => {
            setBreadcrumbs([]);
            setButtons([]);
        };
    }, [user]);

    if (!user || !data) {
        return <LoadingContent />;
    }

    if (!data?.users || user?.role !== "librarian") {
        navigate(`/`);
        return <LoadingContent />;
    }

    return (
        <Box sx={{ m: 2 }}>
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
                        {data.users.map((row) => (
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
                                    <EditableTypography>
                                        {row.firstName}
                                    </EditableTypography>
                                </TableCell>
                                <TableCell align="left">
                                    <EditableTypography>
                                        {row.lastName}
                                    </EditableTypography>
                                </TableCell>
                                <TableCell align="left">
                                    <EditableTypography>
                                        {row.email}
                                    </EditableTypography>
                                </TableCell>
                                <TableCell align="left">{row.role}</TableCell>
                                <TableCell align="center">
                                    <Checkbox checked={row.enabled} />
                                </TableCell>
                                <TableCell align="right">
                                    <Stack direction="row" spacing={0.5} >
                                        <IconButton aria-label="delete" size="medium">
                                            <EditIcon fontSize="inherit" />
                                        </IconButton>
                                        <IconButton aria-label="delete" size="medium">
                                            <DeleteIcon fontSize="inherit" />
                                        </IconButton>
                                    </Stack>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};
export default User;
