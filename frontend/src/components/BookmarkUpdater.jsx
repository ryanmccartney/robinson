import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Modal from "@mui/material/Modal";
import Divider from "@mui/material/Divider";

import NumberInput from "@components/NumberInput/NumberInput";
import fetcher from "@utils/fetcher";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    height: "20%",
    boxShadow: 24,
    p: 2,
};

const BookmarkUpdater = ({ open, setOpen, data, setData }) => {
    const updateBook = async (value) => {
        if (value) {
            const updatedData = await fetcher.put(
                `books/${data?.book?.bookId}`,
                value
            );
            setData(updatedData);
        }
    };

    return (
        <div>
            <Modal
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Card sx={style}>
                    <Stack
                        height="100%"
                        direction="row"
                        spacing={2}
                        divider={
                            <Divider
                                orientation="vertical"
                                flexItem
                                children="of"
                            />
                        }
                    >
                        <Box
                            sx={{
                                width: "100%",
                                transform: "translateY(30%)",
                            }}
                        >
                            <NumberInput
                                onChange={updateBook}
                                field="progress"
                                defaultValue={data.book.progress}
                                min={0}
                                max={data.book.pages}
                            ></NumberInput>
                        </Box>
                        <Box
                            sx={{
                                width: "100%",
                                transform: "translateY(30%)",
                            }}
                        >
                            <NumberInput
                                onChange={updateBook}
                                field="pages"
                                defaultValue={data.book.pages}
                                min={1}
                                max={999}
                            ></NumberInput>
                        </Box>
                    </Stack>
                </Card>
            </Modal>
        </div>
    );
};

export default BookmarkUpdater;
