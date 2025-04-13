import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import isbn from "isbn3";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Rating from "@mui/material/Rating";
import Chip from "@mui/material/Chip";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import CoverCard from "@cards/CoverCard";
import EditableTypography from "@components/EditableTypography";
import OrganiserDialog from "@dialogs/OrganiserDialog";
import LoadingContent from "@components/LoadingContent";
import BookProgress from "@components/BookProgress";
import BreadcrumbsContext from "@contexts/breadcrumbs";
import ButtonsContext from "@contexts/buttons";
import QrDialog from "@dialogs/QrDialog";
import fetcher from "@utils/fetcher";
import { useBook } from "@utils/data";

const Book = () => {
    const navigate = useNavigate();
    const { bookId } = useParams();
    const { book, isBookLoading, bookMutate } = useBook(bookId);

    const [edit, setEdit] = useState(false);
    const [organiserOpen, setOrganiserOpen] = useState(false);
    const { setBreadcrumbs } = useContext(BreadcrumbsContext);
    const { setButtons } = useContext(ButtonsContext);

    const deleteBook = async () => {
        await fetcher.delete(`books/${bookId}`);
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

        if (!book.shelfId) {
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
        await fetcher.put(`books/${bookId}`, bookData);
        bookMutate();
    };

    const favouriteBook = async () => {
        await fetcher.put(`books/${bookId}`, {
            favourite: !book?.favourite,
        });
        bookMutate();
    };

    useEffect(() => {
        setBreadcrumbs([
            { title: "Home", link: `/` },
            {
                title: book?.case?.name || "Case",
                link: `/case/${book?.case?.caseId}`,
            },
            {
                title: book?.shelf?.name || "Shelf",
                link: `/shelf/${book?.shelf?.shelfId}`,
            },
            {
                title: book?.title || "Book",
                link: `/book/${book?.bookId}`,
            },
        ]);

        setButtons([
            {
                label: "Edit",
                icon: "Edit",
                callback: () => setEdit((s) => !s),
            },
            { label: "Delete", icon: "Delete", callback: deleteBook },

            {
                label: "Favourite",
                icon: book?.favourite ? "Favorite" : "FavoriteBorder",
                callback: favouriteBook,
            },
            {
                label: "Change Location",
                icon: "DensityLarge",
                callback: () => setOrganiserOpen(true),
            },
        ]);

        return () => {
            setBreadcrumbs([]);
            setButtons([]);
        };
    }, [book]);

    if (isBookLoading) {
        return <LoadingContent />;
    }

    if (!isBookLoading && !book) {
        navigate(`/books`);
        return <LoadingContent />;
    }

    return (
        <Box sx={{ m: 2 }}>
            <OrganiserDialog
                book={book}
                bookMutate={bookMutate}
                open={organiserOpen}
                setOpen={setOrganiserOpen}
            />
            <Grid container sx={{ paddingRight: { xs: 0, md: 2 } }} spacing={3}>
                <Grid align="center" size={{ xs: 12, md: 4, lg: 6 }}>
                    <Grid container spacing={2}>
                        <Grid align="center" size={{ xs: 12, lg: 12 }}>
                            <CoverCard
                                edit={edit}
                                book={book}
                                bookMutate={bookMutate}
                            />
                        </Grid>
                        <Grid align="center" size={{ xs: 12, lg: 12 }}>
                            <BookProgress
                                progress={book.progress}
                                total={book.pages}
                            />
                        </Grid>
                    </Grid>
                </Grid>

                <Grid size={{ xs: 12, md: 8, lg: 6 }}>
                    <Grid container spacing={0}>
                        <Grid margin="0" size={{ xs: 12, lg: 8 }}>
                            <EditableTypography
                                field="title"
                                edit={edit}
                                onChange={updateBook}
                                variant="h4"
                            >
                                {book.title}
                            </EditableTypography>
                        </Grid>
                        <Grid
                            margin="0"
                            paddingTop="5px"
                            align="right"
                            size={{ xs: 12, lg: 4 }}
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
                        {book.author}
                    </EditableTypography>

                    <Rating
                        name="simple-controlled"
                        value={book.rating}
                        onChange={async (_, rating) => {
                            await fetcher.put(`books/${bookId}`, {
                                rating,
                            });
                            bookMutate();
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
                        {book.description}
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
                        <Grid size={{ xs: 6 }}>
                            <Typography
                                fontWeight="fontWeightMedium"
                                variant="body2"
                            >
                                Publisher
                            </Typography>
                        </Grid>
                        <Grid size={{ xs: 6 }}>
                            <EditableTypography
                                field="publisher"
                                edit={edit}
                                onChange={updateBook}
                                variant="body2"
                            >
                                {book.publisher}
                            </EditableTypography>
                        </Grid>
                        <Grid size={{ xs: 6 }}>
                            <Typography
                                fontWeight="fontWeightMedium"
                                variant="body2"
                            >
                                Published
                            </Typography>
                        </Grid>
                        <Grid size={{ xs: 6 }}>
                            {edit ? (
                                <LocalizationProvider
                                    dateAdapter={AdapterDayjs}
                                >
                                    <DatePicker
                                        sx={{ width: "100%" }}
                                        value={dayjs(book.publishDate)}
                                        onChange={(newValue) =>
                                            updateBook({
                                                publishDate: newValue,
                                            })
                                        }
                                    />
                                </LocalizationProvider>
                            ) : (
                                <Typography variant="body2">
                                    {dayjs(book.publishDate).format(
                                        "MMMM YYYY"
                                    )}
                                </Typography>
                            )}
                        </Grid>
                        <Grid size={{ xs: 6 }}>
                            <Typography
                                fontWeight="fontWeightMedium"
                                variant="body2"
                            >
                                Pages
                            </Typography>
                        </Grid>
                        <Grid size={{ xs: 6 }}>
                            <EditableTypography
                                field="pages"
                                edit={edit}
                                onChange={updateBook}
                                variant="body2"
                            >
                                {book.pages}
                            </EditableTypography>
                        </Grid>
                        <Grid size={{ xs: 6 }}>
                            <Typography
                                fontWeight="fontWeightMedium"
                                variant="body2"
                            >
                                ISBN-13
                            </Typography>
                        </Grid>
                        <Grid size={{ xs: 6 }}>
                            <EditableTypography
                                field="isbn"
                                edit={edit}
                                onChange={updateBook}
                                variant="body2"
                            >
                                {getISBN(book.isbn)}
                            </EditableTypography>
                        </Grid>

                        <Grid size={{ xs: 6 }}>
                            <Typography
                                fontWeight="fontWeightMedium"
                                variant="body2"
                            ></Typography>
                        </Grid>
                        <Grid size={{ xs: 6 }}>
                            <Typography
                                fontWeight="fontWeightMedium"
                                variant="body2"
                            ></Typography>
                        </Grid>
                        <Grid size={{ xs: 6 }}>
                            <QrDialog
                                url={window.location.href}
                                label={book.title}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
};
export default Book;
