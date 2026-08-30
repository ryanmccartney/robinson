import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import LinearProgress from "@mui/material/LinearProgress";

const LinearProgressWithLabel = (props) => {
    const normalise = (value) => {
        const normalisedValue = ((value - 0) * 100) / (props.max - 0);
        return isNaN(normalisedValue) ? 0 : normalisedValue;
    };

    return (
        <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box
                sx={{
                    paddingTop: 2.5,
                    minWidth: 100,
                    display: { xs: "none", md: "block" },
                }}
            >
                <Typography
                    variant="subtitle1"
                    sx={{ color: "text.secondary" }}
                >
                    {props.max ? `${Math.round(props.value)} pages` : ""}
                </Typography>
            </Box>

            <Box sx={{ width: "100%" }}>
                <Box sx={{ width: "100%" }}>
                    <Typography
                        variant="subtitle1"
                        sx={{ color: "text.secondary" }}
                    >
                        {isNaN(normalise(props.value))
                            ? `Add total number pages to see your progress`
                            : `${Math.round(normalise(props.value))}%`}
                    </Typography>
                </Box>
                <Box sx={{ width: "100%" }}>
                    <LinearProgress
                        sx={{ height: 20, borderRadius: 5 }}
                        variant="determinate"
                        {...{
                            ...props,
                            ...{
                                max: props.max ? props.max : 1,
                                value: normalise(props.value),
                            },
                        }}
                    />
                </Box>
            </Box>
            <Box
                sx={{
                    paddingTop: 2.5,
                    minWidth: 100,
                    display: { xs: "none", md: "block" },
                }}
            >
                <Typography
                    variant="subtitle1"
                    sx={{ color: "text.secondary" }}
                >
                    {props.max ? `${Math.round(props.max)} pages` : ""}
                </Typography>
            </Box>
        </Box>
    );
};

export default function BookProgress({ total, progress }) {
    return (
        <Box sx={{ width: "100%" }}>
            {total ? (
                <LinearProgressWithLabel value={progress ?? 0} max={total} />
            ) : (
                <LinearProgressWithLabel color="inherit" value={0} max={0} />
            )}
        </Box>
    );
}
