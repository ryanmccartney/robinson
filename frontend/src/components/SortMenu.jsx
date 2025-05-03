import Menu from "@mui/material/Menu";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import DoneIcon from "@mui/icons-material/Done";

const SortMenu = ({
    filterOptions = {
        title: {
            label: "Title",
            ascending: "A to Z",
            descending: "Z to A",
        },
        author: {
            label: "Author",
            ascending: "A to Z",
            descending: "Z to A",
        },
        pages: {
            label: "Pages",
            ascending: "Low to High",
            descending: "High to Low",
        },
        progress: {
            label: "Progress",
            ascending: "Low to High",
            descending: "High to Low",
        },
        rating: {
            label: "Rating",
            ascending: "Low to High",
            descending: "High to Low",
        },
        favorites: {
            label: "Favorites",
            ascending: "Favorites Top",
            descending: "Favorites Bottom",
        },
        shelfId: {
            label: "Orphaned",
            ascending: "Unlocated Top",
            descending: "Unlocated Bottom",
        },
        lastUpdated: {
            label: "Last Updated",
            ascending: "Most to Least recent",
            descending: "Least to Most recent",
        },
        order: {
            label: "Shelf Order",
            ascending: "Forward",
            descending: "Reverse",
        },
    },
    setFilter = () => {},
    filter = {},
    anchorEl,
    setAnchorEl,
}) => {
    const open = Boolean(anchorEl);

    const handleFilterOptionClick = (key) => {
        key && setFilter({ [key]: Object.values(filter)[0] });
    };

    const handleDirectionClick = (direction) => {
        setFilter({ [Object.keys(filter)[0]]: direction > 0 ? 1 : -1 });
    };

    const getSortMenuItems = () => {
        const menuItems = [];

        Object.entries(filterOptions).map(([key, value]) => {
            menuItems.push(
                <MenuItem
                    onClick={() => handleFilterOptionClick(key)}
                    key={key}
                >
                    <ListItemIcon>
                        {key === Object.keys(filter)[0] && (
                            <DoneIcon fontSize="small" />
                        )}
                    </ListItemIcon>
                    <ListItemText>{value.label}</ListItemText>
                </MenuItem>
            );
        });

        menuItems.push(<Divider key="divider" />);

        menuItems.push(
            <MenuItem
                key="ascending"
                onClick={() => handleDirectionClick(true)}
            >
                <ListItemIcon>
                    {Object.values(filter)[0] > 0 && (
                        <DoneIcon fontSize="small" />
                    )}
                </ListItemIcon>
                <ListItemText>
                    {filterOptions[Object.keys(filter)[0]]
                        ? filterOptions[Object.keys(filter)[0]].ascending
                        : "Low to High"}
                </ListItemText>
            </MenuItem>
        );

        menuItems.push(
            <MenuItem
                key="descending"
                onClick={() => handleDirectionClick(false)}
            >
                <ListItemIcon>
                    {Object.values(filter)[0] < 0 && (
                        <DoneIcon fontSize="small" />
                    )}
                </ListItemIcon>
                <ListItemText>
                    {filterOptions[Object.keys(filter)[0]]
                        ? filterOptions[Object.keys(filter)[0]].descending
                        : "High to Low"}
                </ListItemText>
            </MenuItem>
        );

        return menuItems;
    };

    return (
        <Menu
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            anchorEl={anchorEl}
            open={open}
            onClose={() => {
                setAnchorEl(null);
            }}
            slotProps={{
                paper: {
                    elevation: 0,
                    sx: {
                        overflow: "visible",
                        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                        mt: 1.5,
                        "&::before": {
                            content: '""',
                            display: "block",
                            position: "absolute",
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: "background.paper",
                            transform: "translateY(-50%) rotate(45deg)",
                            zIndex: 0,
                        },
                    },
                },
            }}
        >
            <MenuList dense>{getSortMenuItems()}</MenuList>
        </Menu>
    );
};

export default SortMenu;
