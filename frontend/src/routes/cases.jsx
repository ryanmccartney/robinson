import { useEffect, useContext } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { useCases } from "@utils/data";

import CaseCard from "@cards/CaseCard";
import BreadcrumbsContext from "@contexts/breadcrumbs";
import LoadingContent from "@components/LoadingContent";

const Cases = () => {
    const { cases, isCasesLoading } = useCases();
    const { setBreadcrumbs } = useContext(BreadcrumbsContext);

    const setContexts = () => {
        setBreadcrumbs([
            { title: "Home", link: `/` },
            { title: "Cases", link: `/cases` },
        ]);
    };

    //On component Mount
    useEffect(() => {
        setContexts();
    }, []);

    //On component Unmount (cleanup)
    useEffect(() => {
        return () => {
            setBreadcrumbs([]);
        };
    }, []);

    if (isCasesLoading) {
        return <LoadingContent />;
    }

    const getCaseCards = () => {
        const caseCards = [];
        Object.keys(cases).forEach((id) => {
            caseCards.push(<CaseCard key={id} bookcase={cases[id]} />);
        });
        return caseCards;
    };

    return (
        <Box sx={{ m: 2 }}>
            <Grid container spacing={4}>
                {getCaseCards()}
            </Grid>
        </Box>
    );
};

export default Cases;
