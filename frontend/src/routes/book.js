import React, { useState, useEffect, useContext } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Rating from "@mui/material/Rating";
import { useParams, useNavigate } from "react-router-dom";
import Barcode from "react-barcode";
import QRCode from "react-qr-code";

import LoadingContent from "./../components/LoadingContent";
import BookProgress from "./../components/BookProgress";
import BreadcrumbsContext from "./../contexts/breadcrumbs";
import ButtonsContext from "./../contexts/buttons";
import { Height } from "@mui/icons-material";

const Book = () => {
    const navigate = useNavigate();
    const { bookId } = useParams();
    const [data, setData] = useState(null);
    const [rating, setRating] = useState(0);
    const { breadcrumbs, setBreadcrumbs } = useContext(BreadcrumbsContext);
    const { buttons, setButtons } = useContext(ButtonsContext);

    const deleteBook = async () => {
        console.log(`Delete book - ${bookId}`);
        await fetch(`/api/books/${bookId}`, { method: "DELETE" });
        navigate(`/books`);
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
                { title: data?.case?.name || "Case", link: `/case/${data?.case?.caseId}` },
                { title: data?.shelf?.name || "Shelf", link: `/shelf/${data?.shelf?.shelfId}` },
                { title: data?.book.title, link: `/book/${data?.book?.bookId}` },
            ]);
        }

        if (data) {
            setButtons([
                { label: "Edit", icon: "Edit", link: `/book/${data?.book?.bookId}/edit` },
                { label: "Delete", icon: "Delete", callback: deleteBook },

                {
                    label: "Favourite",
                    icon: data?.book?.favourite ? "Favorite" : "FavoriteBorder",
                    callback: () => favouriteBook(data?.book),
                },
                { label: "Change Shelf", icon: "DensityLarge" },
            ]);
        }
    };

    //On component Mount
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`/api/books/${bookId}`);
            const data = await response.json();
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
        <>
            <Grid container sx={{ paddingRight: 3 }} spacing={4}>
                <Grid item align="center" xs={12} md={4} lg={6}>
                    <Grid container spacing={2}>
                        <Grid item align="center" lg={12}>
                            <Box
                                component="img"
                                sx={{
                                    minWidth: "50%",
                                    maxWidth: "80%",
                                }}
                                alt={`${data.book.title} Cover`}
                                src={`/api/books/cover/${data.book.bookId}`}
                            />
                        </Grid>
                        <Grid item align="center" lg={12}>
                            <BookProgress progress={data.book.progress} total={data.book.pages} />
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={12} md={8} lg={6}>
                    <Typography variant="h4">{data.book.title}</Typography>

                    <Typography gutterBottom variant="subtitle2">
                        {data.book.author}
                    </Typography>

                    <br></br>
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

                    <Typography gutterBottom align="justify" variant="body2">
                        {data.book.description}
                    </Typography>

                    <Typography gutterBottom variant="h5">
                        Details
                    </Typography>

                    <Grid container spacing={2} direction="row" justifyContent="flex-start" alignItems="flex-start">
                        <Grid item xs={4}>
                            <Typography fontWeight="fontWeightMedium" variant="body2">
                                Publisher
                            </Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <Typography variant="body2">{data.book.publisher}</Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography fontWeight="fontWeightMedium" variant="body2">
                                Published
                            </Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <Typography variant="body2">{data.book.publishDate}</Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography fontWeight="fontWeightMedium" variant="body2">
                                Pages
                            </Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <Typography variant="body2">{data.book.pages}</Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography fontWeight="fontWeightMedium" variant="body2">
                                ISBN
                            </Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <Typography variant="body2">{data.book.isbn}</Typography>
                        </Grid>
                    </Grid>

                    <Grid container spacing={2} alignItems="center">
                        <Grid item align="center" xs={12} md={4} lg={6}>
                            <Barcode width={2} height={50} fontSize={15} value={data.book.isbn.toString()} />
                        </Grid>
                        <Grid item align="center" xs={12} md={4} lg={6}>
                            <QRCode size={100} value={window.location.href} />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};
export default Book;
