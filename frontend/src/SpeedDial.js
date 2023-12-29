import * as React from "react";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";

import ImportContactsIcon from "@mui/icons-material/ImportContacts";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import DensitySmallIcon from "@mui/icons-material/DensitySmall";
import DensityLargeIcon from "@mui/icons-material/DensityLarge";

const actions = [
    { icon: <QrCodeScannerIcon />, name: "Add a Book by ISBN" },
    { icon: <ImportContactsIcon />, name: "Add a Book" },
    { icon: <DensityLargeIcon />, name: "Add a Shelf" },
    { icon: <DensitySmallIcon />, name: "Add a Case" },
];

export default function ControlledOpenSpeedDial() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <Box sx={{ position: "relative", mt: 3, height: 320 }}>
            <SpeedDial
                sx={{ position: "absolute", bottom: 16, right: 16 }}
                ariaLabel="add a book"
                icon={<SpeedDialIcon />}
                onClose={handleClose}
                onOpen={handleOpen}
                open={open}
            >
                {actions.map((action) => (
                    <SpeedDialAction
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                        onClick={handleClose}
                    />
                ))}
            </SpeedDial>
        </Box>
    );
}
