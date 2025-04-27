import { useState, useRef } from "react";

import { useTheme } from "@mui/material/styles";
import { TextField, Button } from "@mui/material";
import Stack from "@mui/material/Stack";
import FileUploadIcon from "@mui/icons-material/FileUpload";

const FileUpload = ({ onUpload = () => {}, fileName, fileType = "ebook" }) => {
    const fileInputRef = useRef(null);
    const [file, setFile] = useState(null);
    const theme = useTheme();

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
        <Stack spacing={1} direction={{ sm: "row", xl: "column" }}>
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
            />
            <input
                type="file"
                ref={fileInputRef}
                accept={".epub"}
                style={{ display: "none" }}
                onChange={handleChange}
            />

            <Button
                sx={{
                    [theme.breakpoints.down("sm")]: { width: "100%" },
                    [theme.breakpoints.up("sm")]: { width: "40%" },
                    [theme.breakpoints.down("sm")]: { mt: 2, mb: 1 },
                }}
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
