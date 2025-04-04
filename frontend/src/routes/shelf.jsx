import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import fetcher from "@utils/fetcher";

import EditableTypography from "@components/EditableTypography";
import BreadcrumbsContext from "@contexts/breadcrumbs";
import ButtonsContext from "@contexts/buttons";
import LoadingContent from "@components/LoadingContent";
import BookCarousel from "@components/BookCarousel";

const Shelf = () => {
    const navigate = useNavigate();
    const { shelfId } = useParams();
    const [data, setData] = useState(null);
    const [edit, setEdit] = useState(false);
    const { setBreadcrumbs } = useContext(BreadcrumbsContext);
    const { setButtons } = useContext(ButtonsContext);

    const deleteShelf = async () => {
        console.log(`Delete shelf - ${shelfId}`);
        await fetcher.delete(`shelves/${shelfId}`);
        navigate(`/shelves`);
    };

    const updateShelf = async (shelfData) => {
        const newData = await fetcher.put(`shelves/${shelfId}`, shelfData);
        setData(newData);
        setContexts(newData);
    };

    const setContexts = (data) => {
        if (data) {
            setBreadcrumbs([
                { title: "Home", link: `/` },
                {
                    title: data?.case?.name || "Case",
                    link: `/case/${data?.case?.caseId}`,
                },
                {
                    title: data?.shelf?.name || "Shelf",
                    link: `/shelf/${data?.shelf?.shelfId}`,
                },
            ]);
        }

        if (data) {
            setButtons([
                {
                    label: "Edit",
                    icon: "Edit",
                    callback: () => setEdit((s) => !s),
                },
                { label: "Delete", icon: "Delete", callback: deleteShelf },
            ]);
        }
    };

    //On component Mount
    useEffect(() => {
        const fetchData = async () => {
            const data = await fetcher(`shelves/${shelfId}`);
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

    if (!data.shelf) {
        navigate(`/shelves`);
        return <LoadingContent />;
    }

    return (
        <Box sx={{ m: 2 }}>
            <Grid container spacing={4}>
                <Grid size={{ xs: 12 }}>
                    <BookCarousel
                        title={data?.shelf?.name}
                        books={data?.books}
                    />
                </Grid>

                <Grid size={{ xs: 12, md: 12, lg: 12 }}>
                    <EditableTypography
                        field="name"
                        edit={edit}
                        onChange={updateShelf}
                        variant="h5"
                    >
                        {data?.shelf?.name}
                    </EditableTypography>

                    <EditableTypography
                        gutterBottom
                        field="description"
                        edit={edit}
                        onChange={updateShelf}
                        variant="subtitle2"
                    >
                        {data?.shelf?.description}
                    </EditableTypography>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Shelf;
