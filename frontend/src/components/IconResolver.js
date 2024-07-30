import React from "react";
import * as Icons from "@mui/icons-material";

const IconResolver = ({ iconName, ...props }) => {
    const IconComponent = Icons[iconName];

    if (!IconComponent) {
        console.error(`Icon "${iconName}" not found`);
        return null;
    }

    return <IconComponent {...props} />;
};

export default IconResolver;
