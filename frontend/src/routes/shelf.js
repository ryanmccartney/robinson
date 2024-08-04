import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

import BreadcrumbsContext from "./../contexts/breadcrumbs";
import LoadingContent from "./../components/LoadingContent";
import BookCarousel from "./../components/BookCarousel";

const Shelf = () => {
    const navigate = useNavigate();
    const { shelfId } = useParams();
    const [data, setData] = useState(null);
    const { breadcrumbs, setBreadcrumbs } = useContext(BreadcrumbsContext);

    const setContexts = (data) => {
        if (data) {
            setBreadcrumbs([
                { title: "Home", link: `/` },
                { title: data?.case?.name || "Case", link: `/case/${data?.case?.caseId}` },
                { title: data?.shelf?.name || "Shelf", link: `/shelf/${data?.shelf?.shelfId}` },
            ]);
        }
    };

    //On component Mount
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`/api/shelves/${shelfId}`);
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

    if (!data.shelf) {
        navigate(`/shelves`);
        return <LoadingContent />;
    }

    return (
        <>
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <BookCarousel title={data?.shelf?.name} books={data?.books} />
                </Grid>

                <Grid item xs={12} md={8} lg={6}>
                    <Typography gutterBottom variant="subtitle2">
                        {data?.shelf?.description}
                    </Typography>
                </Grid>
            </Grid>
        </>
    );
};
export default Shelf;
