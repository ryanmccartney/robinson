import { useEffect, useContext } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import { useShelves } from "@utils/data";
import ShelfCard from "@cards/ShelfCard";
import BreadcrumbsContext from "@contexts/breadcrumbs";
import LoadingContent from "@components/LoadingContent";

const Shelves = () => {
    const { shelves, isShelvesLoading } = useShelves();
    const { setBreadcrumbs } = useContext(BreadcrumbsContext);

    useEffect(() => {
        setBreadcrumbs([
            { title: "Home", link: `/` },
            { title: "Cases", link: `/cases` },
            { title: "Shelves", link: `/shelves` },
        ]);
        return () => {
            setBreadcrumbs([]);
        };
    }, []);

    if (isShelvesLoading) {
        return <LoadingContent />;
    }

    const getShelfCards = () => {
        const shelfCards = [];
        {
            Object.keys(shelves).forEach((id, index) => {
                shelfCards.push(<ShelfCard key={index} shelf={shelves[id]} />);
            });
        }

        return shelfCards;
    };

    return (
        <Box sx={{ m: 2 }}>
            <Grid container spacing={2}>
                {getShelfCards()}
            </Grid>
        </Box>
    );
};

export default Shelves;
