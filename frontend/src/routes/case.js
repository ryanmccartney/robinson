import React, { useState, useEffect, useContext } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { useParams, useNavigate } from "react-router-dom";

import EditableTypography from "../components/EditableTypography";
import BreadcrumbsContext from "./../contexts/breadcrumbs";
import ButtonsContext from "./../contexts/buttons";
import LoadingContent from "./../components/LoadingContent";
import BookCarousel from "./../components/BookCarousel";

const Case = () => {
    const navigate = useNavigate();
    const { caseId } = useParams();
    const [data, setData] = useState(null);
    const [edit, setEdit] = useState(false);
    const { breadcrumbs, setBreadcrumbs } = useContext(BreadcrumbsContext);
    const { buttons, setButtons } = useContext(ButtonsContext);

    const deleteCase = async () => {
        console.log(`Delete case - ${caseId}`);
        await fetch(`/api/cases/${caseId}`, { method: "DELETE" });
        navigate(`/cases`);
    };

    const updateCase = async (caseData) => {
        const response = await fetch(`/api/cases/${caseId}`, {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(caseData),
        });
        const newData = await response.json();
        //setData(newData);
        //setContexts(newData);
    };

    const setContexts = (data) => {
        if (data) {
            setBreadcrumbs([
                { title: "Home", link: `/` },
                { title: data?.case?.name || "Case", link: `/case/${data?.case?.caseId}` },
            ]);
        }

        if (data) {
            setButtons([
                { label: "Edit", icon: "Edit", callback: () => setEdit((s) => !s) },
                { label: "Delete", icon: "Delete", callback: deleteCase },
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
            setButtons([]);
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
        for (const shelf of data?.shelves) {
            shelves.push(
                <Grid key={shelf?.shelfId} item xs={12}>
                    <BookCarousel title={shelf?.name} books={shelf?.books} />
                </Grid>
            );
        }
        return shelves;
    };

    return (
        <Box sx={{ m: 2 }}>
            <EditableTypography field="name" edit={edit} onChange={updateCase} variant="h5">
                {data?.case?.name}
            </EditableTypography>

            <EditableTypography field="description" edit={edit} onChange={updateCase} variant="subtitle2">
                {data?.case?.description}
            </EditableTypography>

            <Grid container spacing={2}>
                {getShelves()}
            </Grid>
        </Box>
    );
};
export default Case;
