import React, { useEffect, useContext } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";

import LoadingContent from "../components/LoadingContent";
import BreadcrumbsContext from "../contexts/breadcrumbs";
import ButtonsContext from "../contexts/buttons";

import { UserContext } from "../contexts/user";
import { Typography } from "@mui/material";

import UserAvatar from "../components/UserAvatar";
import EditableTypography from "../components/EditableTypography";

const User = () => {
    const navigate = useNavigate();

    const { user, setUser } = useContext(UserContext);
    const { breadcrumbs, setBreadcrumbs } = useContext(BreadcrumbsContext);
    const { buttons, setButtons } = useContext(ButtonsContext);

    const updateUser = async (bookData) => {
        const response = await fetch(`/api/books/${bookId}`, {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(bookData),
        });
        const newData = await response.json();
        // setData(newData);
        // setContexts(newData);
    };


    const setContexts = (user) => {
        if (user) {
            setBreadcrumbs([
                { title: "Home", link: `/` },
                { title: "Users", link: `/users` },
                { title: `${user?.firstName} ${user?.lastName}` || user?.username, link: `/user/${user?.userId}` },
            ]);
        }
    };

    //On component Mount
    useEffect(() => {
        setContexts(user)
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
            <Grid container spacing={3}>
                <Grid item align="center" xs={12} md={4} lg={6} xl={6}>
                    <Card sx={{ padding: 3 }}>
                        <UserAvatar user={user} sx={{ width: "6rem", height: "6rem" }} />
                        <Typography variant="h4">Account Details</Typography>


                        <EditableTypography edit={true}
                            variant="body2">{user?.firstName}</EditableTypography>

                        <EditableTypography edit={true} variant="body2">{user?.lastName}</EditableTypography>

                        <EditableTypography edit={true} variant="body2">{user?.email}</EditableTypography>

                        <EditableTypography edit={user?.role === "librarian" ? true : false} variant="body2">{user?.role}</EditableTypography>

                        <CardActions>
                            <Button size="small" color="primary">
                                Cancel
                            </Button>
                            <Button size="small" color="primary">
                                Save
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>
        </Box >
    );
};
export default User;
