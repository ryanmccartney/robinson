import InputBase from "@mui/material/InputBase";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { grey } from "@mui/material/colors";

const InputBaseWithChildren = ({ children, ...props }) => {
    let value = "";
    if (children) {
        if (typeof children == "string" || typeof children == "number") {
            value = children.toString();
        }
    }

    const childProps = { ...props };
    delete childProps.gutterBottom;

    return (
        <InputBase
            sx={{
                margin: 0.5,
                lineHeight: 0,
                padding: 0.5,
                border: 1,
                borderRadius: 1,
                borderColor: grey[500],
            }}
            fullWidth
            {...childProps}
            className={""}
            value={value}
            inputProps={{ className: props.className }}
        />
    );
};

const EditableTypography = ({
    field = "data",
    edit = false,
    onChange,
    ...props
}) => {
    const [internalValue, setInternalValue] = useState(props.children);

    const handleChange = (e) => {
        setInternalValue(e.target.value);
        if (onChange) {
            onChange({ [field]: e.target.value });
        }
    };

    delete props.children;

    if (edit) {
        return (
            <Typography
                {...props}
                component={InputBaseWithChildren}
                onChange={handleChange}
            >
                {internalValue}
            </Typography>
        );
    }

    return <Typography {...props}>{internalValue}</Typography>;
};

export default EditableTypography;
