import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import EditableTypography from "@components/EditableTypography";
import BreadcrumbsContext from "@contexts/breadcrumbs";
import ButtonsContext from "@contexts/buttons";
import LoadingContent from "@components/LoadingContent";
import BookCarousel from "@components/BookCarousel";
import BookCarouselSkelton from "@components/BookCarouselSkelton";
import fetcher from "@utils/fetcher";
import { useCase } from "@utils/data";

const Case = () => {
    const navigate = useNavigate();
    const { caseId } = useParams();
    const { case: bookcase, isCaseLoading, caseMutate } = useCase(caseId);

    const [edit, setEdit] = useState(false);
    const { setBreadcrumbs } = useContext(BreadcrumbsContext);
    const { setButtons } = useContext(ButtonsContext);

    const deleteCase = async () => {
        await fetcher.delete(`cases/${caseId}`);
        navigate(`/cases`);
    };

    const updateCase = async (caseData) => {
        const newData = await fetcher.put(`cases/${caseId}`, caseData);
        caseMutate(newData);
        setContexts(newData);
    };

    const setContexts = () => {
        if (bookcase) {
            setBreadcrumbs([
                { title: "Home", link: `/` },
                {
                    title: bookcase?.name || "Case",
                    link: `/case/${bookcase?.caseId}`,
                },
            ]);

            setButtons([
                {
                    label: "Edit",
                    icon: "Edit",
                    callback: () => setEdit((s) => !s),
                },
                { label: "Delete", icon: "Delete", callback: deleteCase },
            ]);
        }
    };

    //On component Mount
    useEffect(() => {
        setContexts();
    }, [bookcase]);

    //On component Unmount (cleanup)
    useEffect(() => {
        return () => {
            setBreadcrumbs([]);
            setButtons([]);
        };
    }, []);

    if (isCaseLoading) {
        return <LoadingContent />;
    }

    if (!isCaseLoading && !bookcase) {
        navigate(`/cases`);
        return <LoadingContent />;
    }

    const getShelves = () => {
        const shelves = [];
        for (const shelf of bookcase?.shelves || []) {
            shelves.push(
                <Grid key={shelf?.shelfId} size={{ xs: 12 }}>
                    {edit ? (
                        <BookCarouselSkelton
                            caseMutate={caseMutate}
                            shelfId={shelf?.shelfId}
                            title={shelf?.name}
                            caseId={caseId}
                            books={shelf?.books.length}
                        />
                    ) : (
                        <BookCarousel
                            title={shelf?.name}
                            books={shelf?.books}
                        />
                    )}
                </Grid>
            );
        }

        if (edit) {
            shelves.push(
                <Grid key="add" size={{ xs: 12 }}>
                    <BookCarouselSkelton
                        caseMutate={caseMutate}
                        caseId={caseId}
                    />
                </Grid>
            );
        }

        return shelves;
    };

    return (
        <Box sx={{ m: 2 }}>
            <EditableTypography
                field="name"
                edit={edit}
                onChange={updateCase}
                variant="h5"
            >
                {bookcase?.name}
            </EditableTypography>

            <EditableTypography
                field="description"
                edit={edit}
                onChange={updateCase}
                variant="subtitle2"
            >
                {bookcase?.description}
            </EditableTypography>

            <Grid container spacing={2}>
                {getShelves()}
            </Grid>
        </Box>
    );
};
export default Case;
