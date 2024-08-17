import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import LibraryCard from "../cards/LibraryCard";
import fetcher from "./../utils/fetcher";

const Libraries = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetcher(`libraries`);
            setData(data);
        };
        fetchData();
    }, []);

    const getLibraryCards = () => {
        const libraryCards = [];
        {
            Object.keys(libraries).forEach((id, index) => {
                libraryCards.push(<LibraryCard key={index} library={data[id]} />);
            });
        }

        return libraryCards;
    };

    return (
        <>
            <Grid container spacing={4}>
                {getLibraryCards()}
            </Grid>
        </>
    );
};

export default Libraries;
