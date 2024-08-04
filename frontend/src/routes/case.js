import React, { useState, useEffect, useContext } from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { useParams, useNavigate } from "react-router-dom";

import BreadcrumbsContext from "./../contexts/breadcrumbs";
import LoadingContent from "./../components/LoadingContent";
import BookCarousel from "./../components/BookCarousel";

const Case = () => {
    const navigate = useNavigate();
    const { caseId } = useParams();
    const [data, setData] = useState(null);
    const { breadcrumbs, setBreadcrumbs } = useContext(BreadcrumbsContext);

    const setContexts = (data) => {
        if (data) {
            setBreadcrumbs([
                { title: "Home", link: `/` },
                { title: data?.case?.name || "Case", link: `/case/${data?.case?.caseId}` },
            ]);
        }
    };

    //On component Mount
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`/api/cases/${caseId}`);
            const data = await response.json();

            setData(data);
            setContexts(data);
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

    if (!data.case) {
        navigate(`/cases`);
        return <LoadingContent />;
    }

    const getShelves = () => {
        const shelves = [];
        for (let shelf of data?.shelves) {
            shelves.push(
                <Grid key={shelf?.shelfId} item xs={12}>
                    <BookCarousel title={shelf?.name} books={shelf?.books} />
                </Grid>
            );
        }
        return shelves;
    };

    return (
        <>
            <Typography gutterBottom variant="h5">
                {data?.case?.name}
            </Typography>

            <Typography gutterBottom variant="subtitle2">
                {data?.case?.description}
            </Typography>

            <Grid container spacing={2}>
                {getShelves()}
            </Grid>
        </>
    );
};
export default Case;
