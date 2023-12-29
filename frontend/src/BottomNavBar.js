import * as React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Paper from "@mui/material/Paper";

import ImportContactsIcon from "@mui/icons-material/ImportContacts";
import DensitySmallIcon from "@mui/icons-material/DensitySmall";
import DensityLargeIcon from "@mui/icons-material/DensityLarge";
import { Link } from "react-router-dom";

export default function FixedBottomNavigation() {
    const [value, setValue] = React.useState(0);

    return (
        <Paper sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }} elevation={3}>
            <BottomNavigation
                showLabels
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
            >
                <BottomNavigationAction component={Link} to="/books" label="Books" icon={<ImportContactsIcon />} />
                <BottomNavigationAction component={Link} to="/shelves" label="Shelves" icon={<DensityLargeIcon />} />
                <BottomNavigationAction component={Link} to="/cases" label="Cases" icon={<DensitySmallIcon />} />
            </BottomNavigation>
        </Paper>
    );
}
