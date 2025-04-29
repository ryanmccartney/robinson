import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import EditableTypography from "@components/EditableTypography";
import BreadcrumbsContext from "@contexts/breadcrumbs";
import ButtonsContext from "@contexts/buttons";
import LoadingContent from "@components/LoadingContent";
import BookCarousel from "@components/BookCarousel";
import ShelfCapacity from "@components/ShelfCapacity";
import ShelfLength from "@dialogs/ShelfLength";
import fetcher from "@utils/fetcher";
import { useShelf } from "@utils/data";

const Shelf = () => {
    const navigate = useNavigate();
    const { shelfId } = useParams();
    const { shelf, isShelfLoading, shelfMutate } = useShelf(shelfId);

    const [length, setLength] = useState(false);
    const [edit, setEdit] = useState(false);
    const { setBreadcrumbs } = useContext(BreadcrumbsContext);
    const { setButtons } = useContext(ButtonsContext);

    const deleteShelf = async () => {
        await fetcher.delete(`shelves/${shelfId}`);
        navigate(`/shelves`);
    };

    const updateShelf = async (shelfData) => {
        await fetcher.put(`shelves/${shelfId}`, shelfData);
        shelfMutate();
    };

    useEffect(() => {
        setBreadcrumbs([
            { title: "Home", link: `/` },
            {
                title: shelf?.case?.name || "Case",
                link: `/case/${shelf?.case?.caseId}`,
            },
            {
                title: shelf?.name || "Shelf",
                link: `/shelf/${shelf?.shelfId}`,
            },
        ]);
        setButtons([
            {
                label: "Edit",
                icon: "Edit",
                callback: () => setEdit((s) => !s),
            },
            {
                label: "Shelf Length",
                icon: "Straighten",
                callback: () => setLength((s) => !s),
            },
            { label: "Delete", icon: "Delete", callback: deleteShelf },
        ]);

        return () => {
            setBreadcrumbs([]);
            setButtons([]);
        };
    }, [shelf]);

    if (isShelfLoading) {
        return <LoadingContent />;
    }

    if (!isShelfLoading && !shelf) {
        navigate(`/shelves`);
        return <LoadingContent />;
    }

    return (
        <Box sx={{ m: 2 }}>
            <ShelfLength
                open={length}
                setOpen={setLength}
                shelf={shelf}
                shelfMutate={shelfMutate}
            />
            <Grid
                container
                direction="column"
                sx={{
                    justifyContent: "center",
                    alignItems: "flex-start",
                }}
                spacing={0}
            >
                <Grid size={{ xs: 12, md: 12, lg: 12 }}>
                    <EditableTypography
                        field="name"
                        edit={edit}
                        onChange={updateShelf}
                        variant="h5"
                    >
                        {shelf?.name}
                    </EditableTypography>

                    <EditableTypography
                        field="description"
                        edit={edit}
                        onChange={updateShelf}
                        variant="subtitle2"
                    >
                        {shelf?.description}
                    </EditableTypography>
                </Grid>

                <Grid size={{ xs: 12 }}>
                    <BookCarousel books={shelf?.books} />
                </Grid>

                {shelf?.length ? (
                    <Grid
                        align="center"
                        sx={{ pt: 2 }}
                        size={{ xs: 12, lg: 12 }}
                    >
                        <ShelfCapacity
                            current={shelf?.current}
                            capacity={shelf?.length}
                        />
                    </Grid>
                ) : null}
            </Grid>
        </Box>
    );
};

export default Shelf;
