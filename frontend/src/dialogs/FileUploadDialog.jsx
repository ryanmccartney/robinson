import { useNavigate } from "react-router-dom";

import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";

import FileUpload from "@components/FileUpload";

const FileUploadDialog = ({ open = false, setOpen, book, bookMutate }) => {
    const navigate = useNavigate();

    const onUpload = async (formData) => {
        const response = await fetch(`/api/books/ebook/${book.bookId}`, {
            method: "POST",
            body: formData,
        });

        const data = await response.json();

        if (data.status === "success") {
            bookMutate();
        }
    };

    const existingEbookInfo = (
        <>
            <Button
                variant="contained"
                color="primary"
                type="submit"
                onClick={() => navigate(`/reader/${book.bookId}`)}
            >
                View Ebook
            </Button>

            <Typography
                id="transition-modal-title"
                variant="body"
                component="div"
                mt={2}
            >
                {book?.ebook?.description}
            </Typography>

            <Divider sx={{ mb: 2, mt: 2 }} />
        </>
    );

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
                        {book?.ebook ? "Upload an eBook" : ""}
                    </Typography>

                    <Typography
                        id="transition-modal-title"
                        variant="caption"
                        component="div"
                        mb={2}
                    >
                        {book?.ebook
                            ? "Add an eBook for this title, upload an ePUB file"
                            : ""}
                    </Typography>

                    {book?.ebook ? existingEbookInfo : null}

                    <FileUpload
                        fileName={`${book.bookId}.epub`}
                        onUpload={onUpload}
                    ></FileUpload>
                </Box>
            </Fade>
        </Modal>
    );
};

export default FileUploadDialog;
