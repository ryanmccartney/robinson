import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./routes/layout";
import Error from "./routes/error";
import Root from "./routes/root";
import Shelves from "./routes/shelves";
import Books from "./routes/books";
import Cases from "./routes/cases";

import Book from "./routes/book";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route path="/" element={<Root />} />
                    <Route path="shelves" element={<Shelves />} />
                    <Route path="books" element={<Books />} />
                    <Route path="book/:bookId" element={<Book />} />
                    <Route path="cases" element={<Cases />} />
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
