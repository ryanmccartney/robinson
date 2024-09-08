import React, { useContext } from "react";
import Link from "@mui/material/Link";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";

import ButtonsContext from "../contexts/buttons";
import IconResolver from "./IconResolver";

const sentenceCase = (str) => {
    return str
        .replace(/[a-z]/i, function (letter) {
            return letter.toUpperCase();
        })
        .trim();
};

const ButtonsLayout = () => {
    const { buttons, setButtons } = useContext(ButtonsContext);

    const getButtons = () => {
        const buttonItems = [];

        for (let button of buttons) {
            if (button.icon) {
                buttonItems.push(
                    <Tooltip key={button.label} title={button.label}>
                        <IconButton onClick={button?.callback} href={button?.link} aria-label={button.label}>
                            <IconResolver iconName={button.icon}></IconResolver>
                        </IconButton>
                    </Tooltip>
                );
            } else {
                buttonItems.push(
                    <Tooltip title="Edit">
                        <Button onClick={button?.callback} href={button?.link} aria-label={button.label}>
                            {sentenceCase(button.label)}
                        </Button>
                    </Tooltip>
                );
            }
        }

        return buttonItems;
    };

    if (buttons.length > 0) {
        return (
            <Stack direction="row" spacing={0.1} sx={{ paddingRight: 1.5, justifyContent: "end" }}>
                {getButtons()}
            </Stack>
        );
    }

    return null;
};

export default ButtonsLayout;
