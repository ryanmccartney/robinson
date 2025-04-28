import { useState, useRef } from "react";
import QRCode from "react-qr-code";

import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";

import Dialog from "@components/Dialog";

const QrDialog = ({ url, label }) => {
    const theme = useTheme();
    const code = useRef(null);
    const [open, setOpen] = useState(false);

    return (
        <div>
            <QRCode
                ref={code}
                onClick={() => {
                    setOpen(true);
                }}
                size={70}
                bgColor={theme.palette.mode === "light" ? "#ffffff" : "#000000"}
                fgColor={theme.palette.mode === "light" ? "#000000" : "#ffffff"}
                value={url}
                onMouseOver={() => {
                    code.current.style.transform = "scale(1.15)";
                    code.current.style.opacity = 0.95;
                }}
                onMouseOut={() => {
                    code.current.style.transform = "scale(1.0)";
                    code.current.style.opacity = 1.0;
                }}
            />

            <Dialog open={open} setOpen={setOpen}>
                <Typography
                    id="transition-modal-title"
                    variant="h5"
                    component="h5"
                    mb={2}
                >
                    {label}
                </Typography>
                <QRCode
                    size={250}
                    value={url}
                    bgColor={
                        theme.palette.mode === "light" ? "#ffffff" : "#000000"
                    }
                    fgColor={
                        theme.palette.mode === "light" ? "#000000" : "#ffffff"
                    }
                />

                <Typography
                    id="transition-modal-title"
                    variant="subtitle"
                    component="p"
                    mt={2}
                >
                    {url}
                </Typography>
            </Dialog>
        </div>
    );
};

export default QrDialog;
