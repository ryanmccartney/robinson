import { useTheme } from "@mui/material/styles";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";

const Dialog = ({ open = false, setOpen, children }) => {
    const theme = useTheme();

    return (
        <Modal
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
                        borderRadius: 1,
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        boxShadow: 24,
                        bgcolor: "background.paper",
                        [theme.breakpoints.up("xs")]: { width: "90%", p: 1 },
                        [theme.breakpoints.up("sm")]: { width: "70%", p: 1 },
                        [theme.breakpoints.up("lg")]: { width: "40%", p: 2 },
                        [theme.breakpoints.up("xl")]: { width: "30%", p: 2 },
                        textAlign: "center",
                        textDecoration: "none",
                    }}
                >
                    {children}
                </Box>
            </Fade>
        </Modal>
    );
};

export default Dialog;
