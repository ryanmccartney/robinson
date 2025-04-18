import { render, screen } from "@testing-library/react";

import BookCard from "./BookCard";
import { MemoryRouter } from "react-router-dom";
import { books } from "@mock/data";

test("Renders the component, check title and author appear ", () => {
    render(
        <MemoryRouter>
            <BookCard key="LeRokD4E2zRXdjw" book={books["LeRokD4E2zRXdjw"]} />
        </MemoryRouter>
    );

    const h6Elements = screen.getAllByRole("heading", { level: 6 });

    expect(h6Elements[0]).toHaveTextContent(books["LeRokD4E2zRXdjw"].title);
    expect(h6Elements[1]).toHaveTextContent(books["LeRokD4E2zRXdjw"].author);
});
