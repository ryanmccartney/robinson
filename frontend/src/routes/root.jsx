import { useState, useEffect, useContext } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import fetcher from "@utils/fetcher";

import BreadcrumbsContext from "@contexts/breadcrumbs";
import BookCarousel from "@components/BookCarousel";

const Root = () => {
    const { setBreadcrumbs } = useContext(BreadcrumbsContext);
    const [favourites, setFavourites] = useState(null);
    const [reading, setReading] = useState(null);
    const [recently, setRecently] = useState(null);

    const setContexts = () => {
        setBreadcrumbs([{ title: "Home", link: `/` }]);
    };

    //On component Mount
    useEffect(() => {
        const fetchData = async () => {
            setFavourites(await fetcher(`books/favourites`));
            setReading(await fetcher(`books/progress`));
            setRecently(await fetcher(`books/new`));
        };
        fetchData();
        setContexts();
    }, []);

    //On component Unmount (cleanup)
    useEffect(() => {
        return () => {
            setBreadcrumbs([]);
        };
    }, []);

    return (
        <Box sx={{ m: 2 }}>
            <Grid container spacing={2}>
                {recently?.books && recently?.books.length > 0 ? (
                    <Grid size={{ xs: 12 }}>
                        <BookCarousel
                            title="Recently Added"
                            books={recently?.books}
                        />
                    </Grid>
                ) : null}

                {reading?.books && reading?.books.length > 0 ? (
                    <Grid size={{ xs: 12 }}>
                        <BookCarousel
                            title="Continue Reading"
                            books={reading?.books}
                        />
                    </Grid>
                ) : null}

                {favourites?.books && favourites?.books.length > 0 ? (
                    <Grid size={{ xs: 12 }}>
                        <BookCarousel
                            title="Favourites"
                            books={favourites?.books}
                        />
                    </Grid>
                ) : null}
            </Grid>
        </Box>
    );
};
export default Root;
