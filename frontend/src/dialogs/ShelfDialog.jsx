import Card from "@mui/material/Card";
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

import { useShelves } from "@utils/data";

const ShelfDialog = ({ open, setOpen, onShelfChange }) => {
    const { shelves, isShelvesLoading } = useShelves();

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
                        <ListItemText id={shelf.shelfId} primary={shelf.name} />
                    </ListItemButton>
                </ListItem>
            );
        }
        return shelvesItem;
    };

    return (
        <div>
            <Modal
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <Card
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: "40%",
                        boxShadow: 24,
                        p: 2,
                    }}
                >
                    <Typography
                        id="modal-title"
                        variant="h5"
                        component="h2"
                        mb={2}
                    >
                        Select Shelf
                    </Typography>

                    <List>{getShelves()}</List>
                </Card>
            </Modal>
        </div>
    );
};

export default ShelfDialog;
