import React, { useState, lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SnackbarProvider } from "notistack";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme";

import BreadcrumbsContext from "./contexts/breadcrumbs";
import ButtonsContext from "./contexts/buttons";
import { UserProvider } from "./contexts/user";
import Layout from "./routes/layout";
import LoadingContent from "./components/LoadingContent";

const Error = lazy(() => import("./routes/error"));
const Root = lazy(() => import("./routes/root"));
const Scan = lazy(() => import("./routes/scan"));
const Login = lazy(() => import("./routes/login"));

const Shelves = lazy(() => import("./routes/shelves"));
const Shelf = lazy(() => import("./routes/shelf"));

const Books = lazy(() => import("./routes/books"));
const Book = lazy(() => import("./routes/book"));

const Cases = lazy(() => import("./routes/cases"));
const Case = lazy(() => import("./routes/case"));

const User = lazy(() => import("./routes/user"));
const Users = lazy(() => import("./routes/users"));

const Libraries = lazy(() => import("./routes/libraries"));
const Library = lazy(() => import("./routes/library"));

const App = () => {
    const [breadcrumbs, setBreadcrumbs] = useState([{ title: "Home", link: "/" }]);
    const [buttons, setButtons] = useState([]);

    return (
        <ThemeProvider theme={theme()}>
            <CssBaseline />
            <UserProvider>
                <SnackbarProvider
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "right",
                    }}
                    sx={{
                        "& .notistack-SnackbarContainer": {
                            bottom: "6rem !important",
                        },
                    }}
                    maxSnack={4}
                    autoHideDuration={3000}
                    preventDuplicate
                >
                    <BreadcrumbsContext.Provider value={{ breadcrumbs, setBreadcrumbs }}>
                        <ButtonsContext.Provider value={{ buttons, setButtons }}>
                            <BrowserRouter>
                                <Suspense fallback={<LoadingContent />}>
                                    <Routes>
                                        <Route path="/" element={<Layout />}>
                                            <Route path="/" element={<Root />} />
                                            <Route path="login" element={<Login />} />
                                            <Route path="scan" element={<Scan />} />
                                            <Route path="shelves" element={<Shelves />} />
                                            <Route path="shelf/:shelfId" element={<Shelf />} />
                                            <Route path="books" element={<Books />} />
                                            <Route path="book/:bookId" element={<Book />} />
                                            <Route path="cases" element={<Cases />} />
                                            <Route path="case/:caseId" element={<Case />} />
                                            <Route path="libraries" element={<Libraries />} />
                                            <Route path="library/:libraryId" element={<Library />} />
                                            <Route path="users" element={<Users />} />
                                            <Route path="user/:userId" element={<User />} />
                                            <Route path="*" element={<Error />} />
                                        </Route>
                                    </Routes>
                                </Suspense>
                            </BrowserRouter>
                        </ButtonsContext.Provider>
                    </BreadcrumbsContext.Provider>
                </SnackbarProvider>
            </UserProvider>
        </ThemeProvider>
    );
};

ReactDOM.createRoot(document.getElementById("root")).render(
    <>
        <App />
    </>
);
