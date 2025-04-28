import { useState } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";

import Dialog from "@components/Dialog";
import NumberInput from "@components/NumberInput/NumberInput";
import fetcher from "@utils/fetcher";

const BookmarkDialog = ({ open, setOpen, book, bookMutate }) => {
    const [lastUpdate, setLastUpdate] = useState(new Date());
    const debounceTime = 250;

    const updateBookProgress = async (value) => {
        const currentTime = new Date();
        if (
            value &&
            lastUpdate.getTime() + debounceTime < currentTime.getTime()
        ) {
            setLastUpdate(currentTime);
            await fetcher.put(`books/${book?.bookId}`, {
                progress: parseInt(value),
            });
            bookMutate();
        }
    };

    const updateBookTotal = async (value) => {
        const currentTime = new Date();
        if (
            value &&
            lastUpdate.getTime() + debounceTime < currentTime.getTime()
        ) {
            setLastUpdate(currentTime);
            await fetcher.put(`books/${book?.bookId}`, {
                pages: parseInt(value),
            });
            bookMutate();
        }
    };

    return (
        <Dialog open={open} setOpen={setOpen}>
            <Stack
                direction={{ xs: "column", md: "row" }}
                spacing={{ xs: 1, md: 2 }}
                sx={{
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    minHeight: "5rem",
                }}
                divider={
                    <Divider orientation="vertical" flexItem>
                        of
                    </Divider>
                }
            >
                <Box>
                    <NumberInput
                        onChange={updateBookProgress}
                        defaultValue={book.progress}
                        min={0}
                        max={book.pages}
                    ></NumberInput>
                </Box>
                <Box>
                    <NumberInput
                        onChange={updateBookTotal}
                        defaultValue={book.pages}
                        min={1}
                        max={999}
                    ></NumberInput>
                </Box>
            </Stack>
        </Dialog>
    );
};

export default BookmarkDialog;
