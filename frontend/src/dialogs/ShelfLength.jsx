import { useState } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import Dialog from "@components/Dialog";
import NumberInput from "@components/NumberInput/NumberInput";
import fetcher from "@utils/fetcher";

const ShelfLength = ({ open, setOpen, shelf, shelfMutate }) => {
    const [lastUpdate, setLastUpdate] = useState(new Date());
    const debounceTime = 250;

    const updateShelfLength = async (value) => {
        const currentTime = new Date();
        if (
            value &&
            lastUpdate.getTime() + debounceTime < currentTime.getTime()
        ) {
            setLastUpdate(currentTime);
            await fetcher.put(`shelves/${shelf?.shelfId}`, {
                length: parseInt(value),
            });
            shelfMutate();
        }
    };

    return (
        <Dialog open={open} setOpen={setOpen}>
            <Typography align="left" variant="h6" component="h6" mb={1}>
                Shelf Length
            </Typography>

            <Typography align="left" variant="caption" component="div" mb={1}>
                Set the length of the shelf here to keep track of how full it is
            </Typography>

            <Stack
                direction={{ xs: "column", md: "row" }}
                spacing={{ xs: 1, md: 2 }}
                sx={{
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    minHeight: "5rem",
                }}
            >
                <Box>
                    <NumberInput
                        units="cm"
                        disabled
                        defaultValue={shelf.current || 0}
                    ></NumberInput>
                </Box>
                <Box>
                    <NumberInput
                        units="cm"
                        onChange={updateShelfLength}
                        defaultValue={shelf.length || 0}
                        min={1}
                        max={999}
                    ></NumberInput>
                </Box>
            </Stack>
        </Dialog>
    );
};

export default ShelfLength;
