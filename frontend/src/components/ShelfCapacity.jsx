import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import LinearProgress from "@mui/material/LinearProgress";

const LinearProgressWithLabel = (props) => {
    const normalise = (value) => ((value - 0) * 100) / (props.max - 0);

    const getCapacityText = () => {
        if (props.value >= props.max) {
            return "This Shelf is Full";
        }

        return `${Math.round(normalise(props.value))}%`;
    };
    return (
        <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box
                sx={{
                    paddingBottom: 4,
                    minWidth: 100,
                    display: { xs: "none", md: "block" },
                }}
            >
                <Typography
                    variant="subtitle1"
                    sx={{ color: "text.secondary" }}
                >{`${Math.round(props.value)}cm`}</Typography>
            </Box>

            <Box sx={{ width: "100%" }}>
                <Box sx={{ width: "100%" }}>
                    <LinearProgress
                        sx={{ height: 16, borderRadius: 5 }}
                        variant="determinate"
                        {...{ ...props, ...{ value: normalise(props.value) } }}
                    />
                </Box>
                <Box sx={{ width: "100%" }}>
                    <Typography
                        variant="subtitle1"
                        sx={{ color: "text.secondary" }}
                    >
                        {getCapacityText()}
                    </Typography>
                </Box>
            </Box>
            <Box
                sx={{
                    paddingBottom: 4,
                    minWidth: 100,
                    display: { xs: "none", md: "block" },
                }}
            >
                <Typography
                    variant="subtitle1"
                    sx={{ color: "text.secondary" }}
                >{`${Math.round(props.max)}cm`}</Typography>
            </Box>
        </Box>
    );
};

const ShelfCapacity = ({ current, capacity }) => {
    return (
        <Box sx={{ width: "100%" }}>
            <LinearProgressWithLabel value={current} max={capacity} />
        </Box>
    );
};

export default ShelfCapacity;
