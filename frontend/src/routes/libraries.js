import React from "react";
import Grid from "@mui/material/Grid";
import LibraryCard from "../cards/LibraryCard";
import { libraries } from "../tests/data";

const Libraries = () => {
    const getLibraryCards = () => {
        const libraryCards = [];
        {
            Object.keys(libraries).forEach((id, index) => {
                libraryCards.push(<LibraryCard key={index} library={libraries[id]} />);
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
