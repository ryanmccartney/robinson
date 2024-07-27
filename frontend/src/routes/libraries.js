import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import LibraryCard from "../cards/LibraryCard";
import { libraries } from "../tests/data";

const Libraries = () => {
    const [libraries, setLibraries] = useState([]);

    useEffect(() => {
        fetch(`/api/libraries`)
            .then((response) => response.json())
            .then((json) => setLibraries(json.data))
            .catch((error) => console.error(error));
    }, []);

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
