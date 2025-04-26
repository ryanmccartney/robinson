import { useNavigate } from "react-router-dom";

import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

const FileUploadDialog = ({ open, setOpen, book, bookMutate }) => {
    const navigate = useNavigate();

    const handleFileUpload = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        const file = event.target[0].files[0];
        formData.append("ebook", file, `${book.bookId}.epub`);

        const response = await fetch(`/api/books/ebook/${book.bookId}`, {
            method: "POST",
            body: formData,
        });

        const data = await response.json();

        if (data.status === "success") {
            bookMutate();
        }
    };

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={() => setOpen(false)}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
                backdrop: {
                    timeout: 500,
                },
            }}
        >
            <Fade in={open}>
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        bgcolor: "background.paper",
                        boxShadow: 24,
                        p: 3,
                        textAlign: "center",
                        textDecoration: "none",
                    }}
                >
                    <Typography
                        id="transition-modal-title"
                        variant="h5"
                        component="h5"
                        mb={2}
                    >
                        Upload EPub File
                    </Typography>

                    {book?.ebook ? (
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            onClick={() => navigate(`/reader/${book.bookId}`)}
                        >
                            View Ebook
                        </Button>
                    ) : null}

                    <form onSubmit={handleFileUpload}>
                        <TextField
                            type="file"
                            variant="outlined"
                            inputProps={{ accept: ".epub, .pdf" }}
                            fullWidth
                            margin="normal"
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                        >
                            Upload .epub
                        </Button>
                    </form>
                </Box>
            </Fade>
        </Modal>
    );
};

export default FileUploadDialog;
