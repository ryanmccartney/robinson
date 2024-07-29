import * as React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Paper from "@mui/material/Paper";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";

import CameraAltIcon from "@mui/icons-material/CameraAlt";
import ImportContactsIcon from "@mui/icons-material/ImportContacts";
import DensitySmallIcon from "@mui/icons-material/DensitySmall";
import DensityLargeIcon from "@mui/icons-material/DensityLarge";
import { Link } from "react-router-dom";

export default function FixedBottomNavigation() {
    const [value, setValue] = React.useState(0);

    const actions = [
        { icon: <CameraAltIcon />, name: "Add book", onClick: () => {} },
        { icon: <ImportContactsIcon />, name: "Add book manually", onClick: () => {} },
        { icon: <DensityLargeIcon />, name: "Add shelf", onClick: () => {} },
        { icon: <DensitySmallIcon />, name: "Add case", onClick: () => {} },
    ];

    return (
        <Paper
            sx={{
                position: "fixed",
                bottom: 0,
                left: 0,
                right: 0,
                zIndex: 2500,
            }}
            elevation={3}
        >
            <SpeedDial
                sx={{
                    position: "fixed",
                    bottom: "2rem",
                    right: "2rem",
                    zIndex: 3000,
                }}
                icon={<SpeedDialIcon />}
                ariaLabel="Add menu"
            >
                {actions.map((action) => (
                    <SpeedDialAction
                        onClick={action.onClick}
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                    />
                ))}
            </SpeedDial>

            <BottomNavigation
                showLabels
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
                sx={{
                    height: "4rem",
                }}
            >
                <BottomNavigationAction component={Link} to="/cases" label="Cases" icon={<DensitySmallIcon />} />
                <BottomNavigationAction component={Link} to="/shelves" label="Shelves" icon={<DensityLargeIcon />} />
                <BottomNavigationAction component={Link} to="/books" label="Books" icon={<ImportContactsIcon />} />
            </BottomNavigation>
        </Paper>
    );
}
