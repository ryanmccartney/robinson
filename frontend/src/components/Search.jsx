import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Paper from "@mui/material/Paper";
import Autocomplete from "@mui/material/Autocomplete";

import fetcher from "@utils/fetcher";

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    width: "100%",
    "& .MuiInputBase-input": {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
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

const SearchResult = ({ optionProps, result }) => {
    const navigate = useNavigate();

    console.log(result);
    return <>{result.name}</>;
};

const Search = () => {
    const inputRef = useRef(null);

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
                    setOptions(data.results || []);
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
                inputRef.current.focus();
            }
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    return (
        <Autocomplete
            ref={inputRef}
            freeSolo
            disableClearable
            options={options}
            loading={loading}
            onInputChange={(e, newInputValue) => {
                setSearchTerm(newInputValue);
            }}
            getOptionLabel={(result) => {
                return result.title;
            }}
            renderOption={(props, result) => {
                console.log(result);
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
                delete params.InputLabelProps;
                delete params.InputProps;

                return (
                    <SearchStyled>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Press /"
                            inputRef={params.inputRef}
                            inputProps={{
                                ...params.inputProps,
                                type: "search",
                            }}
                            {...params}
                        />
                    </SearchStyled>
                );
            }}
        />
    );
};

export default Search;
