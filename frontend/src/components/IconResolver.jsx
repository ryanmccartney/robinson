import {
    Edit,
    Delete,
    Favorite,
    FavoriteBorder,
    ViewColumn,
    DensityLarge,
    AutoStories,
    NavigateBefore,
    NavigateNext,
} from "@mui/icons-material";

const IconResolver = ({ iconName, ...props }) => {
    switch (iconName) {
        case "Edit":
            return <Edit {...props} />;
        case "Delete":
            return <Delete {...props} />;
        case "Favorite":
            return <Favorite {...props} />;
        case "FavoriteBorder":
            return <FavoriteBorder {...props} />;
        case "DensityLarge":
            return <DensityLarge {...props} />;
        case "AutoStories":
            return <AutoStories {...props} />;
        case "NavigateBefore":
            return <NavigateBefore {...props} />;
        case "NavigateNext":
            return <NavigateNext {...props} />;
        case "ViewColumn":
            return <ViewColumn {...props} />;
        default:
            console.error(`Icon "${iconName}" not found`);
            return null;
    }
};

export default IconResolver;
