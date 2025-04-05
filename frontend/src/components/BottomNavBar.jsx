import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import fetcher from "@utils/fetcher";

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

export default function FixedBottomNavigation() {
    const navigate = useNavigate();
    const [value, setValue] = useState(0);

    const addBook = async () => {
        const data = await fetcher.post(`books`, { title: "A New Book" });
        if (data.book) {
            enqueueSnackbar(`Created a book called ${data.book.title}`);
            navigate(`/book/${data.book?.bookId}`);
        }
    };

    const addShelf = async () => {
        const data = await fetcher.post(`shelves`, {
            name: "A New Shelf",
        });
        if (data.shelf) {
            enqueueSnackbar(`Created a shelf called ${data.shelf.name}`);
            navigate(`/shelf/${data.shelf?.shelfId}`);
        }
    };

    const addCase = async () => {
        const data = await fetcher.post(`cases`, { name: "A New Case" });
        if (data.case) {
            enqueueSnackbar(`Created a case called ${data.case.name}`);
            navigate(`/case/${data.case?.caseId}`);
        }
    };

    const actions = [
        {
            icon: <CameraAltIcon />,
            name: "Add book",
            onClick: () => navigate(`/scan`),
        },
        {
            icon: <ImportContactsIcon />,
            name: "Add book manually",
            onClick: addBook,
        },
        { icon: <DensityLargeIcon />, name: "Add shelf", onClick: addShelf },
        { icon: <DensitySmallIcon />, name: "Add case", onClick: addCase },
    ];

    return (
        <Paper
            sx={{
                position: "fixed",
                bottom: 0,
                left: 0,
                right: 0,
                zIndex: 1500,
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
                <BottomNavigationAction
                    component={Link}
                    to="/cases"
                    label="Cases"
                    icon={<DensitySmallIcon />}
                />
                <BottomNavigationAction
                    component={Link}
                    to="/shelves"
                    label="Shelves"
                    icon={<DensityLargeIcon />}
                />
                <BottomNavigationAction
                    component={Link}
                    to="/books"
                    label="Books"
                    icon={<ImportContactsIcon />}
                />
            </BottomNavigation>
        </Paper>
    );
}
