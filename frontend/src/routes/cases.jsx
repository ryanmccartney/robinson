import { useEffect, useContext, useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import { useLocalStorageState } from "@utils/useLocalStorage";
import { useCases } from "@utils/data";
import CaseCard from "@cards/CaseCard";
import BreadcrumbsContext from "@contexts/breadcrumbs";
import ButtonsContext from "@contexts/buttons";
import LoadingContent from "@components/LoadingContent";
import NotFound from "@components/NotFound";
import SortMenu from "@components/SortMenu";

const CasesList = ({ filter }) => {
    const { cases, isCasesLoading, casesMutate } = useCases(filter);

    const getCaseCards = () => {
        const caseCards = [];
        cases &&
            Object.keys(cases).forEach((id) => {
                caseCards.push(<CaseCard key={id} bookcase={cases[id]} />);
            });

        if (caseCards.length === 0) {
            return <NotFound label="case" link="cases" mutate={casesMutate} />;
        }

        return caseCards;
    };

    if (isCasesLoading) {
        return <LoadingContent />;
    }

    return (
        <Grid container spacing={2}>
            {getCaseCards()}
        </Grid>
    );
};
const Cases = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [filter, setFilter] = useLocalStorageState("casesFilter", {
        lastUpdated: 1,
    });

    const { setBreadcrumbs } = useContext(BreadcrumbsContext);
    const { setButtons } = useContext(ButtonsContext);

    useEffect(() => {
        setBreadcrumbs([
            { title: "Home", link: `/` },
            { title: "Cases", link: `/cases` },
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
            <CasesList filter={filter} />
        </Box>
    );
};

export default Cases;
