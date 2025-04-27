import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { grey } from "@mui/material/colors";
import fetcher from "@utils/fetcher";
import { enqueueSnackbar } from "notistack";

const NotFound = ({
    link = "shelves",
    label = "shelf",
    labelPlural,
    mutate = () => {},
}) => {
    const handleClick = async () => {
        const data = await fetcher.post(`${link}`, {
            name: `A new ${label}`,
        });

        if (data.shelf) {
            enqueueSnackbar(`Created a ${label} called ${data.shelf.name}`);
        }

        mutate();
    };

    return (
        <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            sx={{ m: 2, width: 1, height: "75vh" }}
        >
            <Typography sx={{ margin: 1 }} color={grey[500]} variant="h3">
                {`You don't have any ${labelPlural ? labelPlural : `${label}s`}`}
            </Typography>
            <Typography sx={{ margin: 1 }} color={grey[500]} variant="h5">
                {"Why don't you add one?"}
            </Typography>

            <Button
                sx={{ margin: 1, color: grey[500], borderColor: grey[600] }}
                variant="outlined"
                onClick={handleClick}
            >
                {`Add ${label}`}
            </Button>
        </Stack>
    );
};

export default NotFound;
