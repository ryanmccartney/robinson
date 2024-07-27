import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import CaseCard from "../cards/CaseCard";

const Cases = () => {
    const [cases, setCases] = useState([]);

    useEffect(() => {
        fetch(`/api/cases`)
            .then((response) => response.json())
            .then((json) => setCases(json.data))
            .catch((error) => console.error(error));
    }, []);

    const getCaseCards = () => {
        const caseCards = [];
        {
            Object.keys(cases).forEach((id, index) => {
                caseCards.push(<CaseCard key={id} bookcase={cases[id]} />);
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
