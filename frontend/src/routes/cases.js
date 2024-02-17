import React from "react";
import Grid from "@mui/material/Grid";
import CaseCard from "../cards/CaseCard";
import { cases } from "../tests/data";

const Cases = () => {
    const getCaseCards = () => {
        const caseCards = [];
        {
            Object.keys(cases).forEach((id, index) => {
                caseCards.push(<CaseCard key={index} casey={cases[id]} />);
            });
        }

        return caseCards;
    };

    return (
        <>
            <Grid container spacing={4}>
                {getCaseCards()}
            </Grid>
        </>
    );
};

export default Cases;
