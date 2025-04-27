import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { grey } from "@mui/material/colors";

const NoEbookFound = ({ bookId }) => {
    return (
        <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            sx={{ m: 2, width: 1, height: "75vh" }}
        >
            <Typography
                align="center"
                sx={{ margin: 1 }}
                color={grey[500]}
                variant="h3"
            >
                {"This is no eBook for this title"}
            </Typography>
            <Typography
                align="center"
                sx={{ margin: 1 }}
                color={grey[500]}
                variant="h5"
            >
                {"Why don't you add one?"}
            </Typography>

            <Button
                sx={{ margin: 1, color: grey[500], borderColor: grey[600] }}
                variant="outlined"
                href={bookId ? `/book/${bookId}` : `/books`}
            >
                {bookId ? `Back to book` : `Back to books`}
            </Button>
        </Stack>
    );
};

export default NoEbookFound;
