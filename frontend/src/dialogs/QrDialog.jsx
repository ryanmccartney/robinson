import { useState, useRef } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";

import QRCode from "react-qr-code";

const QrDialog = ({ url, label }) => {
    const theme = useTheme();
    const code = useRef(null);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <QRCode
                ref={code}
                onClick={handleOpen}
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

            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
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
                            {label}
                        </Typography>
                        <QRCode
                            size={250}
                            value={url}
                            bgColor={
                                theme.palette.mode === "light"
                                    ? "#ffffff"
                                    : "#000000"
                            }
                            fgColor={
                                theme.palette.mode === "light"
                                    ? "#000000"
                                    : "#ffffff"
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
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
};

export default QrDialog;
