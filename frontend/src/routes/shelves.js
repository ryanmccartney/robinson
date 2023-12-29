import React from "react";
import Grid from "@mui/material/Grid";
import ShelfCard from "./../cards/ShelfCard";
import { shelves, books } from "../tests/data";

const Shelves = () => {
    const getShelfCards = () => {
        const shelfCards = [];
        {
            Object.keys(shelves).forEach((id, index) => {
                shelfCards.push(<ShelfCard books={books} key={id} shelf={shelves[id]} />);
            });
        }

        return shelfCards;
    };

    return (
        <>
            <Grid container spacing={4}>
                {getShelfCards()}
            </Grid>
        </>
    );
};

export default Shelves;
