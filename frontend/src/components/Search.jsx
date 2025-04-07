import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Autocomplete from "@mui/material/Autocomplete";
import Grid from "@mui/material/Grid";

import fetcher from "@utils/fetcher";

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    width: "100%",
    "& .MuiInputBase-input": {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create("width"),
        [theme.breakpoints.up("sm")]: {
            width: "30ch",
            "&:focus": {
                width: "40ch",
            },
        },
    },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}));

const SearchStyled = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(1),
        width: "auto",
    },
}));

const SearchResult = ({ result }) => {
    const navigate = useNavigate();
    return (
        <Paper
            elevation={2}
            onClick={() => {
                navigate(`/book/${result.bookId}`);
            }}
            sx={{ mb: 1, p: 2 }}
            onMouseOver={(e) => {
                console.log(e);
                e.target.style.opacity = "0.5";
            }}
            onMouseOut={(e) => {
                e.target.style.opacity = "1";
            }}
        >
            <Grid container spacing={1}>
                <Grid size={2}>
                    <img
                        src={`/api/books/cover/${result.bookId}`}
                        alt="Cover"
                        width={"50rem"}
                        height={"80rem"}
                    />
                    ;
                </Grid>
                <Grid size={10}>
                    <Typography gutterBottom sx={{ fontSize: 16 }}>
                        {result.title}
                    </Typography>
                    <Typography
                        gutterBottom
                        sx={{ color: "text.secondary", fontSize: 12 }}
                    >
                        {result.author}
                    </Typography>

                    <Typography
                        gutterBottom
                        sx={{ color: "text.secondary", fontSize: 10 }}
                    >
                        {`${result.pages} pages`}
                    </Typography>
                </Grid>
            </Grid>
        </Paper>
    );
};

const Search = () => {
    const searchRef = useRef(null);

    const [searchTerm, setSearchTerm] = useState("");
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchSearch = async () => {
            if (searchTerm) {
                setLoading(true);
                const data = await fetcher(
                    `search?query=${encodeURIComponent(searchTerm)}`
                );
                if (data.results) {
                    setOptions(data.results);
                }
                setLoading(false);
            } else {
                setOptions([]);
            }
        };
        fetchSearch();
    }, [searchTerm]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.keyCode === 191) {
                e.preventDefault();
                searchRef.current.focus();
            }
            if (e.keyCode === 27) {
                e.preventDefault();
                searchRef.current.blur();
            }
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    return (
        <Autocomplete
            disableClearable
            autoHighlight
            options={options}
            loading={loading}
            onInputChange={(_, newInputValue) => {
                setSearchTerm(newInputValue);
            }}
            getOptionLabel={(result) => {
                return result.title;
            }}
            renderOption={(props, result) => {
                const { key, ...optionProps } = props;
                return (
                    <SearchResult
                        key={key}
                        optionProps={optionProps}
                        result={result}
                    />
                );
            }}
            renderInput={(params) => {
                return (
                    <SearchStyled>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            ref={params.InputProps.ref}
                            inputRef={searchRef}
                            inputProps={{
                                ...params.inputProps,
                                type: "search",
                            }}
                            placeholder="Press  /"
                        />
                    </SearchStyled>
                );
            }}
        />
    );
};

export default Search;
