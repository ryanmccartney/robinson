import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Typography from "@mui/material/Typography";
import BookSpineCard from "../cards/BookSpineCard";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";

import BreadcrumbsContext from "./../contexts/breadcrumbs";
import LoadingContent from "./../components/LoadingContent";

const Shelf = () => {
    const navigate = useNavigate();
    const { shelfId } = useParams();
    const [data, setData] = useState(null);
    const { breadcrumbs, setBreadcrumbs } = useContext(BreadcrumbsContext);

    const setContexts = (shelf) => {
        if (shelf) {
            setBreadcrumbs([
                { title: "Home", link: `/` },
                { title: shelf?.case?.name || "Case", link: `/case/${shelf?.case?.caseId}` },
                { title: shelf?.name || "Shelf", link: `/shelve/${shelf?.shelfId}` },
            ]);
        }
    };

    //On component Mount
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`/api/books/shelf/${shelfId}`);
            const data = await response.json();
            setData(data);
            setContexts(data?.shelf);
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

    const getBookCards = () => {
        const bookCards = [];
        {
            for (let book of data.books) {
                bookCards.push(<BookSpineCard key={book?.bookId} book={book} />);
            }
        }

        return bookCards;
    };

    return (
        <>
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <Stack sx={{ overflowX: "scroll" }} direction="row" spacing={1}>
                        {getBookCards()}
                    </Stack>
                </Grid>

                <Grid item xs={12} md={8} lg={6}>
                    <Typography gutterBottom variant="h4">
                        {data?.shelf?.name}
                    </Typography>

                    <Typography gutterBottom variant="body2">
                        {data?.shelf?.description}
                    </Typography>

                    <Typography gutterBottom variant="h5">
                        Details
                    </Typography>

                    <Grid
                        container
                        spacing={2}
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="flex-start"
                    ></Grid>
                </Grid>
            </Grid>
        </>
    );
};
export default Shelf;
