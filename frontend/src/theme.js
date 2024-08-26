import { createTheme, responsiveFontSizes } from "@mui/material/styles";

import moderustic from "./fonts/moderustic.ttf";
import playfairDisplay from "./fonts/playfair-display.ttf";

const getTheme = (userMode = "auto") => {
    let setMode = "light";
    const storedMode = localStorage.getItem("theme");

    if (userMode == "auto" || storedMode == "auto") {
        const prefersDarkTheme = window.matchMedia("(prefers-color-scheme: dark)");
        if (prefersDarkTheme) {
            setMode = "dark";
        }
    } else if (storedMode) {
        setMode = storedMode;
    } else {
        setMode = userMode;
    }

    const theme = createTheme({
        palette: {
            mode: setMode,
        },
        typography: {
            body1: {
                fontFamily: "Moderustic",
            },
            body2: {
                fontFamily: "Playfair Display",
            },
            subtitle1: {
                fontFamily: "Moderustic",
            },
            subtitle2: {
                fontFamily: "Playfair Display",
            },
            subtitle: {
                fontFamily: "Moderustic",
            },
            h1: {
                fontFamily: "Moderustic",
            },
            h2: {
                fontFamily: "Moderustic",
            },
            h3: {
                fontFamily: "Moderustic",
            },
            h4: {
                fontFamily: "Moderustic",
            },
            h5: {
                fontFamily: "Moderustic",
            },
            h6: {
                fontFamily: "Moderustic",
            },
            button: {
                fontFamily: "Moderustic",
            },
            header: {
                fontFamily: "Moderustic",
                letterSpacing: "0.2rem",
                fontSize: "1.5rem",
                fontWeight: "bold",
            },
            bottomNavLabel: {
                fontFamily: "Moderustic",
            },
        },
        components: {
            MuiCssBaseline: {
                styleOverrides: {
                    "@font-face": {
                        fontFamily: "Playfair Display",
                        src: `url(${playfairDisplay}) format("truetype")`,
                    },
                    "@font-face": {
                        fontFamily: "Moderustic",
                        src: `url(${moderustic}) format("truetype")`,
                    },
                },
            },
        },
    });

    return responsiveFontSizes(theme);
};

export default getTheme;
