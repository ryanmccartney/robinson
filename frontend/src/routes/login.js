import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";

const Root = () => {
    const [data, setData] = useState(null);

    //On component Mount
    useEffect(() => {
        const fetchData = async () => {
            let response = await fetch(`/api/users/current`);
            let data = await response.json();
            setData(data);
        };
        fetchData();
    }, []);

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                Login
            </Grid>
        </Grid>
    );
};
export default Root;
