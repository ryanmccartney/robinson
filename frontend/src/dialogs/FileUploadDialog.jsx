import { useNavigate } from "react-router-dom";

import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";

import FileUpload from "@components/FileUpload";
import Dialog from "@components/Dialog";

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
        <Dialog open={open} setOpen={setOpen}>
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
        </Dialog>
    );
};

export default FileUploadDialog;
