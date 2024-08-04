import React, { useState, useEffect, useContext } from "react";
import Grid from "@mui/material/Grid";

import BreadcrumbsContext from "./../contexts/breadcrumbs";
import BookCarousel from "./../components/BookCarousel";

const Root = () => {
    const { breadcrumbs, setBreadcrumbs } = useContext(BreadcrumbsContext);
    const [favourites, setFavourites] = useState(null);
    const [reading, setReading] = useState(null);
    const [recently, setRecently] = useState(null);

    const setContexts = () => {
        setBreadcrumbs([{ title: "Home", link: `/` }]);
    };

    //On component Mount
    useEffect(() => {
        const fetchData = async () => {
            let response = await fetch(`/api/books/favourites`);
            let data = await response.json();
            setFavourites(data);

            response = await fetch(`/api/books/progress`);
            data = await response.json();
            setReading(data);

            response = await fetch(`/api/books/new`);
            data = await response.json();
            setRecently(data);
        };
        fetchData();
        setContexts();
    }, []);

    //On component Unmount (cleanup)
    useEffect(() => {
        return () => {
            setBreadcrumbs([]);
        };
    }, []);

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <BookCarousel title="Recently Added" books={recently?.books} />
            </Grid>

            <Grid item xs={12}>
                <BookCarousel title="Continue Reading" books={reading?.books} />
            </Grid>

            <Grid item xs={12}>
                <BookCarousel title="Favourites" books={favourites?.books} />
            </Grid>
        </Grid>
    );
};
export default Root;
