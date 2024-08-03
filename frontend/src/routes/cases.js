import React, { useState, useEffect, useContext } from "react";
import Grid from "@mui/material/Grid";

import CaseCard from "../cards/CaseCard";
import BreadcrumbsContext from "./../contexts/breadcrumbs";
import LoadingContent from "./../components/LoadingContent";

const Cases = () => {
    const [data, setData] = useState(null);
    const { breadcrumbs, setBreadcrumbs } = useContext(BreadcrumbsContext);

    const setContexts = () => {
        setBreadcrumbs([
            { title: "Home", link: `/` },
            { title: "Cases", link: `/cases` },
        ]);
    };

    //On component Mount
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`/api/cases`);
            const data = await response.json();
            setData(data);
            setContexts();
        };
        fetchData();
    }, []);

    //On component Unmount (cleanup)
    useEffect(() => {
        return () => {
            setBreadcrumbs([]);
        };
    }, []);

    if (!data) {
        return <LoadingContent />;
    }

    const getCaseCards = (cases) => {
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
                {getCaseCards(data.cases)}
            </Grid>
        </>
    );
};

export default Cases;
