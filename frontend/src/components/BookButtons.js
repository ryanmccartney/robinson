import React, { useState, useEffect } from "react";

import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DensityLargeIcon from "@mui/icons-material/DensityLarge";

export default function IconButtons() {
    return (
        <Stack direction="row" spacing={0.1}>
            <Tooltip title="Edit">
                <IconButton aria-label="edit">
                    <EditIcon />
                </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
                <IconButton aria-label="delete">
                    <DeleteIcon />
                </IconButton>
            </Tooltip>
            <Tooltip title="Favorite">
                <IconButton aria-label="favorite">
                    <FavoriteBorderIcon />
                </IconButton>
            </Tooltip>
            <Tooltip title="Change Shelf">
                <IconButton aria-label="change shelf">
                    <DensityLargeIcon />
                </IconButton>
            </Tooltip>
        </Stack>
    );
}
