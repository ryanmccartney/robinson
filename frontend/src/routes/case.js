import React, { useState, useEffect, useContext } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useParams, useNavigate } from "react-router-dom";

import BreadcrumbsContext from "./../contexts/breadcrumbs";
import LoadingContent from "./../components/LoadingContent";

const Case = () => {
    const navigate = useNavigate();
    const { caseId } = useParams();
    const [data, setData] = useState(null);
    const { breadcrumbs, setBreadcrumbs } = useContext(BreadcrumbsContext);

    const setContexts = (bookcase) => {
        if (bookcase) {
            setBreadcrumbs([
                { title: "Home", link: `/` },
                { title: bookcase?.name || "Case", link: `/case/${bookcase?.caseId}` },
            ]);
        }
    };

    //On component Mount
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`/api/cases/${caseId}`);
            const data = await response.json();

            setData(data);
            setContexts(data.case);
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

    return (
        <>
            <Grid container spacing={4}>
                <Grid item align="center" xs={12} md={4} lg={6}>
                    <Box
                        component="img"
                        sx={{
                            minWidth: "50%",
                            maxWidth: "80%",
                        }}
                        alt={`${data.case.title} Cover`}
                        src={data.case?.cover}
                    />
                </Grid>

                <Grid item xs={12} md={8} lg={6}>
                    <Typography gutterBottom variant="h4">
                        {data.case.title}
                    </Typography>

                    <Typography gutterBottom variant="body2">
                        {data.case.description}
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
export default Case;
