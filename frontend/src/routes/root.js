import React, { useState, useEffect, useContext } from "react";
import Typography from "@mui/material/Typography";
import BreadcrumbsContext from "./../contexts/breadcrumbs";

const Root = () => {
    const { breadcrumbs, setBreadcrumbs } = useContext(BreadcrumbsContext);

    const setContexts = () => {
        setBreadcrumbs([{ title: "Home", link: `/` }]);
    };

    //On component Mount
    useEffect(() => {
        setContexts();
    }, []);

    //On component Unmount (cleanup)
    useEffect(() => {
        return () => {
            setBreadcrumbs([]);
        };
    }, []);

    return (
        <>
            <Typography variant="body1">Root Page</Typography>
        </>
    );
};
export default Root;
