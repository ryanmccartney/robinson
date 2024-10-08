import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Checkbox from "@mui/material/Checkbox";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import Divider from "@mui/material/Divider";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "40%",
    boxShadow: 24,
    p: 2,
};

const OrganiserModal = ({ open, setOpen, data, setData }) => {
    const [shelves, setShelves] = useState(false);
    const [shelvesComponents, setShelvesComponents] = useState([]);
    const [cases, setCases] = useState(false);
    const [casesComponents, setCasesComponents] = useState([]);

    const fetchShelves = async () => {
        const response = await fetch(`/api/shelves`);
        const shelvesData = await response.json();
        await setShelves(shelvesData);
        await getShelves(shelvesData, data?.case?.caseId, data?.shelf?.shelfId);
    };

    const fetchCases = async () => {
        const response = await fetch(`/api/cases`);
        const casesData = await response.json();
        await setCases(casesData);
        await getCases(casesData, data?.case?.caseId);
    };

    const updateShelf = async (shelves, shelfId) => {
        const response = await fetch(`/api/books/${data.book.bookId}`, {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                shelfId: shelfId,
            }),
        });
        const updatedData = await response.json();
        setData(updatedData);
        getShelves(shelves, data.case.caseId, shelfId);
    };

    const getCases = (cases, selectedCase) => {
        const casesItems = [];

        const isChecked = (caseId) => {
            if (selectedCase == caseId) {
                return true;
            }
            return false;
        };

        if (cases) {
            for (const bookcase of cases.cases) {
                casesItems.push(
                    <ListItem key={bookcase.caseId} disablePadding>
                        <ListItemButton
                            role={undefined}
                            onClick={() => {
                                getCases(cases, bookcase.caseId);
                                getShelves(
                                    shelves,
                                    bookcase.caseId,
                                    data?.shelf?.shelfId
                                );
                            }}
                            dense
                        >
                            <ListItemIcon>
                                <Checkbox
                                    edge="start"
                                    checked={isChecked(bookcase.caseId)}
                                    icon={<RadioButtonUncheckedIcon />}
                                    checkedIcon={<RadioButtonCheckedIcon />}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{
                                        "aria-labelledby": bookcase.caseId,
                                    }}
                                />
                            </ListItemIcon>
                            <ListItemText
                                id={bookcase.caseId}
                                primary={bookcase.name}
                            />
                        </ListItemButton>
                    </ListItem>
                );
            }
        }
        setCasesComponents(casesItems);
    };

    const getShelves = (shelves, caseId, selectedShelf) => {
        const shelvesItem = [];

        const isChecked = (shelfId) => {
            if (selectedShelf == shelfId) {
                return true;
            }
            return false;
        };

        if (shelves) {
            for (const shelf of shelves.shelves) {
                if (shelf.caseId == caseId) {
                    shelvesItem.push(
                        <ListItem key={shelf.shelfId} disablePadding>
                            <ListItemButton
                                role={undefined}
                                onClick={() =>
                                    updateShelf(shelves, shelf.shelfId)
                                }
                                dense
                            >
                                <ListItemIcon>
                                    <Checkbox
                                        edge="start"
                                        checked={isChecked(shelf.shelfId)}
                                        tabIndex={-1}
                                        disableRipple
                                        inputProps={{
                                            "aria-labelledby": shelf.shelfId,
                                        }}
                                        icon={<RadioButtonUncheckedIcon />}
                                        checkedIcon={<RadioButtonCheckedIcon />}
                                    />
                                </ListItemIcon>
                                <ListItemText
                                    id={shelf.shelfId}
                                    primary={shelf.name}
                                />
                            </ListItemButton>
                        </ListItem>
                    );
                }
            }
        }
        setShelvesComponents(shelvesItem);
    };

    //On component Mount
    useEffect(() => {
        fetchShelves();
        fetchCases();
    }, []);

    return (
        <div>
            <Modal
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Card sx={style}>
                    <Typography
                        gutterBottom
                        id="modal-modal-title"
                        variant="h5"
                        component="h2"
                    >
                        Book Organiser
                    </Typography>

                    <Stack
                        direction="row"
                        spacing={2}
                        divider={<Divider orientation="vertical" flexItem />}
                    >
                        <Box sx={{ width: "100%" }}>
                            <Typography
                                id="modal-modal-title"
                                variant="h6"
                                component="h2"
                            >
                                Select Case
                            </Typography>
                            <List>{casesComponents}</List>
                        </Box>
                        <Box sx={{ width: "100%" }}>
                            <Typography
                                id="modal-modal-title"
                                variant="h6"
                                component="h2"
                            >
                                Select Shelf
                            </Typography>
                            <List>{shelvesComponents}</List>
                        </Box>
                    </Stack>
                </Card>
            </Modal>
        </div>
    );
};

export default OrganiserModal;
