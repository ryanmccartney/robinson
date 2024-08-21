import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SnackbarProvider } from "notistack";

import Layout from "./routes/layout";
import Error from "./routes/error";
import Root from "./routes/root";
import Scan from "./routes/scan";
import Login from "./routes/login";

import Shelves from "./routes/shelves";
import Shelf from "./routes/shelf";

import Books from "./routes/books";
import Book from "./routes/book";

import Cases from "./routes/cases";
import Case from "./routes/case";

import Libraries from "./routes/libraries";
import Library from "./routes/library";

import BreadcrumbsContext from "./contexts/breadcrumbs";
import ButtonsContext from "./contexts/buttons";
import { UserProvider } from "./contexts/user";

const App = () => {
    const [breadcrumbs, setBreadcrumbs] = useState([{ title: "Home", link: "/" }]);
    const [buttons, setButtons] = useState([]);

    return (
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
                                    <Route path="*" element={<Error />} />
                                </Route>
                            </Routes>
                        </BrowserRouter>
                    </ButtonsContext.Provider>
                </BreadcrumbsContext.Provider>
            </SnackbarProvider>
        </UserProvider>
    );
};

ReactDOM.createRoot(document.getElementById("root")).render(
    <>
        <App />
    </>
);
