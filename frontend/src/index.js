import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./routes/layout";
import Error from "./routes/error";
import Root from "./routes/root";

import Shelves from "./routes/shelves";
import Shelf from "./routes/shelf";

import Books from "./routes/books";
import Book from "./routes/book";

import Cases from "./routes/cases";
import Case from "./routes/case";

import Libraries from "./routes/libraries";
import Library from "./routes/library";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route path="/" element={<Root />} />
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
    );
};

ReactDOM.createRoot(document.getElementById("root")).render(
    <>
        <App />
    </>
);
