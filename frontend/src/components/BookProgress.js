import React from "react";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import LinearProgress from "@mui/material/LinearProgress";

const LinearProgressWithLabel = (props) => {
    const normalise = (value) => ((value - 0) * 100) / (props.max - 0);

    return (
        <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box sx={{ paddingTop: 2.5, minWidth: 100 }}>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>{`${Math.round(
                    props.value
                )} pages`}</Typography>
            </Box>

            <Box sx={{ width: "100%", mr: 1 }}>
                <Box sx={{ width: "100%", mr: 1 }}>
                    <Typography variant="body2" sx={{ color: "text.secondary" }}>{`${Math.round(
                        normalise(props.value)
                    )}%`}</Typography>
                </Box>
                <Box sx={{ width: "100%", mr: 1 }}>
                    <LinearProgress
                        sx={{ height: 20, borderRadius: 5 }}
                        variant="determinate"
                        {...{ ...props, ...{ value: normalise(props.value) } }}
                    />
                </Box>
            </Box>
            <Box sx={{ paddingTop: 2.5, minWidth: 100 }}>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>{`${Math.round(
                    props.max
                )} pages`}</Typography>
            </Box>
        </Box>
    );
};

export default function BookProgress({ total, progress }) {
    return (
        <Box sx={{ width: "100%" }}>
            <LinearProgressWithLabel value={progress} max={total} />
        </Box>
    );
}
