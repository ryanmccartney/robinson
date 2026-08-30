import InputBase from "@mui/material/InputBase";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { grey } from "@mui/material/colors";

const InputBaseWithChildren = ({ children, ...props }) => {
    const value =
        typeof children === "string" || typeof children === "number"
            ? String(children)
            : "";

    const { ...inputProps } = props;

    return (
        <InputBase
            {...inputProps}
            fullWidth
            value={value}
            sx={{
                margin: 0.5,
                lineHeight: 0,
                padding: 0.5,
                border: 1,
                borderRadius: 1,
                borderColor: grey[500],
            }}
        />
    );
};

const EditableTypography = ({
    field = "data",
    edit = false,
    onChange,
    multiline = false,
    children,
    ...props
}) => {
    const [internalValue, setInternalValue] = useState(children ?? "");

    const handleChange = (e) => {
        const value = e.target.value;

        setInternalValue(value);
        onChange?.({ [field]: value });
    };

    if (!edit) {
        return <Typography {...props}>{children ?? ""}</Typography>;
    }

    return (
        <Typography
            {...props}
            component={InputBaseWithChildren}
            multiline={multiline}
            onChange={handleChange}
        >
            {internalValue}
        </Typography>
    );
};

export default EditableTypography;
