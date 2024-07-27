import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import ShelfCard from "./../cards/ShelfCard";

const Shelves = () => {
    const [shelves, setShelves] = useState([]);

    useEffect(() => {
        fetch(`/api/shelves`)
            .then((response) => response.json())
            .then((json) => setShelves(json.data))
            .catch((error) => console.error(error));
    }, []);

    const getShelfCards = () => {
        const shelfCards = [];
        {
            Object.keys(shelves).forEach((id, index) => {
                shelfCards.push(<ShelfCard books={books} key={index} shelf={shelves[id]} />);
            });
        }

        return shelfCards;
    };

    return (
        <>
            <Grid container spacing={2}>
                {getShelfCards()}
            </Grid>
        </>
    );
};

export default Shelves;
