import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Checkbox from "@mui/material/Checkbox";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";

import { useShelves } from "@utils/data";
import Dialog from "@components/Dialog";

const ShelfDialog = ({ open, setOpen, onShelfChange }) => {
    const { shelves, isShelvesLoading } = useShelves();

    const getText = (shelf) => {
        return (
            <>
                <b>{shelf.name}</b>&nbsp;&nbsp;
                {shelf.case ? `(${shelf.case.name})` : ""}
            </>
        );
    };

    const getShelves = () => {
        const shelvesItem = [];

        if (isShelvesLoading) {
            return null;
        }

        for (const shelf of shelves) {
            shelvesItem.push(
                <ListItem key={shelf.shelfId} disablePadding>
                    <ListItemButton
                        role={undefined}
                        onClick={() => {
                            setOpen(false);
                            onShelfChange(shelf.shelfId);
                        }}
                        dense
                    >
                        <ListItemIcon>
                            <Checkbox
                                edge="start"
                                tabIndex={-1}
                                disableRipple
                                icon={<RadioButtonUncheckedIcon />}
                                checkedIcon={<RadioButtonCheckedIcon />}
                            />
                        </ListItemIcon>
                        <ListItemText
                            id={shelf.shelfId}
                            primary={getText(shelf)}
                        />
                    </ListItemButton>
                </ListItem>
            );
        }
        return shelvesItem;
    };

    return (
        <Dialog open={open} setOpen={setOpen}>
            <Typography id="modal-title" variant="h5" component="h2" mb={2}>
                Select Shelf
            </Typography>

            <List>{getShelves()}</List>
        </Dialog>
    );
};

export default ShelfDialog;
