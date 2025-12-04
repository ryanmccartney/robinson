import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { grey } from "@mui/material/colors";
import fetcher from "@utils/fetcher";
import { enqueueSnackbar } from "notistack";

const NotFound = ({
    link = "shelves",
    label = "shelf",
    data = {},
    labelPlural,
    mutate = () => {},
}) => {
    const handleClick = async () => {
        const response = await fetcher.post(`${link}`, {
            ...{
                name: `A new ${label}`,
            },
            ...data,
        });

        if (response.shelf) {
            enqueueSnackbar(`Created a ${label} called ${response.shelf.name}`);
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
            <Typography
                align="center"
                sx={{ margin: 1 }}
                color={grey[500]}
                variant="h3"
            >
                {`You don't have any ${labelPlural ? labelPlural : `${label}s`}`}
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
                onClick={handleClick}
            >
                {`Add ${label}`}
            </Button>
        </Stack>
    );
};

export default NotFound;
