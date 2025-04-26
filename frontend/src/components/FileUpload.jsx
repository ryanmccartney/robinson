import { useState } from "react";
import { TextField, Button } from "@mui/material";
import Stack from "@mui/material/Stack";
import { useRef } from "react";
import FileUploadIcon from "@mui/icons-material/FileUpload";

const FileUpload = ({ onUpload = () => {}, fileName, fileType = "ebook" }) => {
    const fileInputRef = useRef(null);
    const [file, setFile] = useState(null);

    const handleUpload = async () => {
        if (file) {
            const formData = new FormData();
            formData.append(fileType, file, fileName);
            onUpload(formData);
        }
    };

    const handleClick = () => {
        fileInputRef.current.click();
    };

    const handleChange = (event) => {
        setFile(event.target.files[0]);
    };

    return (
        <Stack direction="row" spacing={1}>
            <TextField
                label={file?.name ? file?.name : "Select File"}
                variant="outlined"
                fullWidth
                onClick={handleClick}
                slotProps={{
                    htmlInput: { readOnly: true, style: { cursor: "none" } },
                }}
                onFocus={(e) => e.target.blur()}
                focused={false}
                f
            />
            <input
                type="file"
                ref={fileInputRef}
                accept={".epub, .pdf"}
                style={{ display: "none" }}
                onChange={handleChange}
            />

            <Button
                sx={{ width: "40%" }}
                variant="contained"
                color="primary"
                onClick={handleUpload}
                endIcon={<FileUploadIcon />}
            >
                Upload
            </Button>
        </Stack>
    );
};

export default FileUpload;
