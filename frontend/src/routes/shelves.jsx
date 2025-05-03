import { useEffect, useContext, useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import { useLocalStorageState } from "@utils/useLocalStorage";
import { useShelves } from "@utils/data";
import ShelfCard from "@cards/ShelfCard";
import BreadcrumbsContext from "@contexts/breadcrumbs";
import LoadingContent from "@components/LoadingContent";
import ButtonsContext from "@contexts/buttons";
import NotFound from "@components/NotFound";
import SortMenu from "@components/SortMenu";

const ShelvesList = ({ filter }) => {
    const { shelves, isShelvesLoading, shelvesMutate } = useShelves(filter);

    const getShelfCards = () => {
        const shelfCards = [];
        {
            shelves &&
                Object.keys(shelves).forEach((id, index) => {
                    shelfCards.push(
                        <ShelfCard key={index} shelf={shelves[id]} />
                    );
                });
        }

        if (shelfCards.length === 0) {
            return (
                <NotFound
                    label="shelf"
                    link="shelves"
                    labelPlural="shelves"
                    mutate={shelvesMutate}
                />
            );
        }

        return shelfCards;
    };

    if (isShelvesLoading) {
        return <LoadingContent />;
    }

    return (
        <Grid container spacing={2}>
            {getShelfCards()}
        </Grid>
    );
};

const Shelves = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [filter, setFilter] = useLocalStorageState("shelvesFilter", {
        lastUpdated: 1,
    });

    const { setBreadcrumbs } = useContext(BreadcrumbsContext);
    const { setButtons } = useContext(ButtonsContext);

    useEffect(() => {
        setBreadcrumbs([
            { title: "Home", link: `/` },
            { title: "Cases", link: `/cases` },
            { title: "Shelves", link: `/shelves` },
        ]);
        setButtons([
            {
                label: "Sort",
                icon: "SwapVert",
                callback: (event) => {
                    setAnchorEl(event.currentTarget);
                },
            },
        ]);
        return () => {
            setBreadcrumbs([]);
            setButtons([]);
        };
    }, []);

    return (
        <Box sx={{ m: 2 }}>
            <SortMenu
                setAnchorEl={setAnchorEl}
                anchorEl={anchorEl}
                setFilter={setFilter}
                filter={filter}
                filterOptions={{
                    name: {
                        label: "Name",
                        ascending: "A to Z",
                        descending: "Z to A",
                    },
                    length: {
                        label: "Length",
                        ascending: "Shortest to Longest",
                        descending: "Longest to Shortest",
                    },
                    order: {
                        label: "User Order",
                        ascending: "Forward",
                        descending: "Reverse",
                    },
                    lastUpdated: {
                        label: "Last Updated",
                        ascending: "Most to Least recent",
                        descending: "Least to Most recent",
                    },
                }}
            ></SortMenu>
            <ShelvesList filter={filter} />
        </Box>
    );
};

export default Shelves;
