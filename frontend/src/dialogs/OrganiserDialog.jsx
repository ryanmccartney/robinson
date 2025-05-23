import { useState } from "react";
import fetcher from "@utils/fetcher";
import { useCases, useShelves } from "@utils/data";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Checkbox from "@mui/material/Checkbox";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import Divider from "@mui/material/Divider";

import Dialog from "@components/Dialog";

const OrganiserDialog = ({ open, setOpen, book, bookMutate }) => {
    const { cases, isCasesLoading } = useCases();
    const { shelves, isShelvesLoading } = useShelves();

    const [selectedCaseId, setSelectedCaseId] = useState(book?.case?.caseId);
    const [selectedShelfId, setSelectedShelfId] = useState(
        book?.shelf?.shelfId
    );

    const updateBook = async (shelfId) => {
        const updatedBook = await fetcher.put(`books/${book.bookId}`, {
            shelfId,
        });
        bookMutate(updatedBook);
    };

    const getCases = () => {
        const casesItems = [];

        if (!isCasesLoading && cases) {
            for (const bookcase of cases) {
                casesItems.push(
                    <ListItem key={bookcase.caseId} disablePadding>
                        <ListItemButton
                            role={undefined}
                            onClick={() => {
                                setSelectedCaseId(bookcase.caseId);
                            }}
                            dense
                        >
                            <ListItemIcon>
                                <Checkbox
                                    edge="start"
                                    checked={
                                        bookcase.caseId === selectedCaseId
                                            ? true
                                            : false
                                    }
                                    icon={<RadioButtonUncheckedIcon />}
                                    checkedIcon={<RadioButtonCheckedIcon />}
                                    tabIndex={-1}
                                    disableRipple
                                />
                            </ListItemIcon>
                            <ListItemText
                                sx={{ textWrap: "nowrap" }}
                                id={bookcase.caseId}
                                primary={bookcase.name}
                            />
                        </ListItemButton>
                    </ListItem>
                );
            }
        }
        return casesItems;
    };

    const getShelves = () => {
        const shelvesItems = [];

        if (!isShelvesLoading && shelves) {
            for (const shelf of shelves) {
                if (shelf.caseId == selectedCaseId) {
                    shelvesItems.push(
                        <ListItem key={shelf.shelfId} disablePadding>
                            <ListItemButton
                                role={undefined}
                                onClick={() => {
                                    setSelectedShelfId(shelf.shelfId);
                                    updateBook(shelf.shelfId);
                                    setOpen(false);
                                }}
                                dense
                            >
                                <ListItemIcon>
                                    <Checkbox
                                        edge="start"
                                        checked={
                                            shelf.shelfId === selectedShelfId
                                                ? true
                                                : false
                                        }
                                        tabIndex={-1}
                                        disableRipple
                                        icon={<RadioButtonUncheckedIcon />}
                                        checkedIcon={<RadioButtonCheckedIcon />}
                                    />
                                </ListItemIcon>
                                <ListItemText
                                    sx={{ textWrap: "nowrap" }}
                                    id={shelf.shelfId}
                                    primary={shelf.name}
                                />
                            </ListItemButton>
                        </ListItem>
                    );
                }
            }
        }
        return shelvesItems;
    };

    return (
        <Dialog open={open} setOpen={setOpen}>
            <Typography align="left" variant="h5" component="h2" mb={2}>
                Book Organiser
            </Typography>

            <Stack
                direction={{ md: "row", xl: "column" }}
                spacing={2}
                divider={<Divider orientation="vertical" flexItem />}
            >
                <Box sx={{ width: "100%" }}>
                    <Typography align="left" variant="h6" component="h6">
                        Cases
                    </Typography>
                    <List>{getCases()}</List>
                </Box>
                <Box sx={{ width: "100%" }}>
                    <Typography align="left" variant="h6" component="h6">
                        Shelves
                    </Typography>
                    <List>{getShelves()}</List>
                </Box>
            </Stack>
        </Dialog>
    );
};

export default OrganiserDialog;
