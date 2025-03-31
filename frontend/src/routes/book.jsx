import React, { useState, useEffect, useContext } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Rating from "@mui/material/Rating";
import Chip from "@mui/material/Chip";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useParams, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import fetcher from "./../utils/fetcher";

import CoverCard from "./../cards/CoverCard";
import EditableTypography from "../components/EditableTypography";
import OrganiserDialog from "../dialogs/OrganiserDialog";
import LoadingContent from "./../components/LoadingContent";
import BookProgress from "./../components/BookProgress";
import BreadcrumbsContext from "./../contexts/breadcrumbs";
import ButtonsContext from "./../contexts/buttons";
import isbn from "isbn3";
import QrDialog from "../dialogs/QrDialog";

const Book = () => {
    const navigate = useNavigate();
    const { bookId } = useParams();
    const [data, setData] = useState(null);
    const [edit, setEdit] = useState(false);
    const [organiserOpen, setOrganiserOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const { breadcrumbs, setBreadcrumbs } = useContext(BreadcrumbsContext);
    const { buttons, setButtons } = useContext(ButtonsContext);

    const deleteBook = async () => {
        console.log(`Delete book - ${bookId}`);
        await fetch(`/api/books/${bookId}`, { method: "DELETE" });
        navigate(`/books`);
    };

    const getISBN = (isbnString, hypens = true) => {
        if (isbnString) {
            const isbnObject = isbn.parse(isbnString);
            if (isbnObject) {
                if (hypens) {
                    return isbnObject.isbn13h;
                }
                return isbnObject.isbn13;
            }
            return isbnString;
        }
    };

    const getChips = () => {
        const chips = [];

        if (!data.book.shelfId) {
            chips.push(
                <Chip
                    sx={{ borderRadius: 1 }}
                    key="1"
                    size="small"
                    label="Orphaned"
                    color="error"
                    onClick={() => setOrganiserOpen(true)}
                />
            );
        }

        return <Box>{chips}</Box>;
    };

    const updateBook = async (bookData) => {
        const response = await fetch(`/api/books/${bookId}`, {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(bookData),
        });
        const newData = await response.json();
        setData(newData);
        setContexts(newData);
    };

    const favouriteBook = async (book) => {
        console.log(`Favourite book - ${bookId}`);
        const response = await fetch(`/api/books/${bookId}`, {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                favourite: !book?.favourite,
            }),
        });
        const newData = await response.json();
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
                {
                    title: data?.book?.title || "Book",
                    link: `/book/${data?.book?.bookId}`,
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
                { label: "Delete", icon: "Delete", callback: deleteBook },

                {
                    label: "Favourite",
                    icon: data?.book?.favourite ? "Favorite" : "FavoriteBorder",
                    callback: () => favouriteBook(data?.book),
                },
                {
                    label: "Change Location",
                    icon: "DensityLarge",
                    callback: () => setOrganiserOpen(true),
                },
            ]);
        }
    };

    //On component Mount
    useEffect(() => {
        const fetchData = async () => {
            const data = await fetcher(`books/${bookId}`);
            setData(data);
            setRating(data?.book?.rating);
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

    if (!data.book) {
        navigate(`/books`);
        return <LoadingContent />;
    }

    return (
        <Box sx={{ m: 2 }}>
            <OrganiserDialog
                data={data}
                setData={setData}
                open={organiserOpen}
                setOpen={setOrganiserOpen}
            />
            <Grid container sx={{ paddingRight: { xs: 0, md: 2 } }} spacing={3}>
                <Grid item align="center" xs={12} md={4} lg={6}>
                    <Grid container spacing={2}>
                        <Grid item align="center" xs={12} lg={12}>
                            <CoverCard
                                edit={edit}
                                data={data}
                                setData={setData}
                            />
                        </Grid>
                        <Grid item align="center" xs={12} lg={12}>
                            <BookProgress
                                progress={data.book.progress}
                                total={data.book.pages}
                            />
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={12} md={8} lg={6}>
                    <Grid container spacing={0}>
                        <Grid margin="0" item xs={12} lg={8}>
                            <EditableTypography
                                field="title"
                                edit={edit}
                                onChange={updateBook}
                                variant="h4"
                            >
                                {data.book.title}
                            </EditableTypography>
                        </Grid>
                        <Grid
                            item
                            margin="0"
                            paddingTop="5px"
                            align="right"
                            xs={12}
                            lg={4}
                        >
                            {getChips()}
                        </Grid>
                    </Grid>

                    <EditableTypography
                        edit={edit}
                        field="author"
                        onChange={updateBook}
                        gutterBottom
                        variant="subtitle1"
                    >
                        {data.book.author}
                    </EditableTypography>

                    <Rating
                        name="simple-controlled"
                        value={rating}
                        onChange={async (event, newRating) => {
                            await fetch(`/api/books/${bookId}`, {
                                method: "PUT",
                                headers: {
                                    Accept: "application/json",
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify({
                                    rating: newRating,
                                }),
                            });
                            setRating(newRating);
                        }}
                    />

                    <EditableTypography
                        gutterBottom
                        field="description"
                        multiline
                        edit={edit}
                        onChange={updateBook}
                        align="justify"
                        variant="body2"
                    >
                        {data.book.description}
                    </EditableTypography>

                    <Typography gutterBottom variant="h5">
                        Details
                    </Typography>

                    <Grid
                        container
                        spacing={2}
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="flex-start"
                    >
                        <Grid item xs={6}>
                            <Typography
                                fontWeight="fontWeightMedium"
                                variant="body2"
                            >
                                Publisher
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <EditableTypography
                                field="publisher"
                                edit={edit}
                                onChange={updateBook}
                                variant="body2"
                            >
                                {data.book.publisher}
                            </EditableTypography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography
                                fontWeight="fontWeightMedium"
                                variant="body2"
                            >
                                Published
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            {edit ? (
                                <LocalizationProvider
                                    dateAdapter={AdapterDayjs}
                                >
                                    <DatePicker
                                        sx={{ width: "100%" }}
                                        value={dayjs(data.book.publishDate)}
                                        onChange={(newValue) =>
                                            updateBook({
                                                publishDate: newValue,
                                            })
                                        }
                                    />
                                </LocalizationProvider>
                            ) : (
                                <Typography variant="body2">
                                    {dayjs(data.book.publishDate).format(
                                        "MMMM YYYY"
                                    )}
                                </Typography>
                            )}
                        </Grid>
                        <Grid item xs={6}>
                            <Typography
                                fontWeight="fontWeightMedium"
                                variant="body2"
                            >
                                Pages
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <EditableTypography
                                field="pages"
                                edit={edit}
                                onChange={updateBook}
                                variant="body2"
                            >
                                {data.book.pages}
                            </EditableTypography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography
                                fontWeight="fontWeightMedium"
                                variant="body2"
                            >
                                ISBN-13
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <EditableTypography
                                field="isbn"
                                edit={edit}
                                onChange={updateBook}
                                variant="body2"
                            >
                                {getISBN(data.book.isbn)}
                            </EditableTypography>
                        </Grid>

                        <Grid item xs={6}>
                            <Typography
                                fontWeight="fontWeightMedium"
                                variant="body2"
                            ></Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography
                                fontWeight="fontWeightMedium"
                                variant="body2"
                            ></Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <QrDialog
                                url={window.location.href}
                                label={data.book.title}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
};
export default Book;
