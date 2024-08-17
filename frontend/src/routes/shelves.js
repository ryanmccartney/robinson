import React, { useState, useEffect, useContext } from "react";
import Grid from "@mui/material/Grid";
import fetcher from "./../utils/fetcher";

import ShelfCard from "./../cards/ShelfCard";
import BreadcrumbsContext from "./../contexts/breadcrumbs";
import LoadingContent from "./../components/LoadingContent";

const Shelves = () => {
    const [data, setData] = useState(null);
    const { breadcrumbs, setBreadcrumbs } = useContext(BreadcrumbsContext);

    const setContexts = () => {
        setBreadcrumbs([
            { title: "Home", link: `/` },
            { title: "Cases", link: `/cases` },
            { title: "Shelves", link: `/shelves` },
        ]);
    };

    //On component Mount
    useEffect(() => {
        const fetchData = async () => {
            setData(await fetcher(`shelves`));
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

    const getShelfCards = (shelves = {}) => {
        const shelfCards = [];
        {
            Object.keys(shelves).forEach((id, index) => {
                shelfCards.push(<ShelfCard key={index} shelf={shelves[id]} />);
            });
        }

        return shelfCards;
    };

    return (
        <>
            <Grid container spacing={2}>
                {getShelfCards(data?.shelves)}
            </Grid>
        </>
    );
};

export default Shelves;
