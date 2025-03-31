import { createTheme, responsiveFontSizes } from "@mui/material/styles";

import moderustic from "./fonts/moderustic.ttf";
import playfairDisplay from "./fonts/playfair-display.ttf";

const getTheme = (userMode = "auto") => {
    let setMode = "light";
    const storedMode = localStorage.getItem("theme");

    if (userMode == "auto" || storedMode == "auto") {
        const prefersDarkTheme = window.matchMedia(
            "(prefers-color-scheme: dark)"
        );
        if (prefersDarkTheme) {
            setMode = "dark";
        }
    }
    if (storedMode && storedMode !== "auto") {
        setMode = storedMode;
    }
    if (userMode && userMode !== "auto") {
        setMode = storedMode;
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
            overline: {
                fontFamily: "Moderustic",
            },
            caption: {
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
        },
        components: {
            MuiCssBaseline: {
                styleOverrides: {
                    html: [
                        {
                            "@font-face": {
                                fontFamily: "Playfair Display",
                                src: `url(${playfairDisplay}) format("truetype")`,
                            },
                        },
                        {
                            "@font-face": {
                                fontFamily: "Moderustic",
                                src: `url(${moderustic}) format("truetype")`,
                            },
                        },
                    ],
                    "html, body": {
                        padding: 0,
                        scrollbarWidth: "thin",
                    },
                },
            },
            MuiTableCell: {
                styleOverrides: {
                    root: {
                        fontFamily: "Moderustic",
                    },
                    body: {
                        fontFamily: "Playfair Display",
                    },
                },
            },
        },
    });

    return responsiveFontSizes(theme);
};

export default getTheme;
