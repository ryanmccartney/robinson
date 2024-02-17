import renderer from "react-test-renderer";
import BookCard from "./BookCard";
import { MemoryRouter } from "react-router-dom";
import { books } from "../tests/data";

test("Renders the component", () => {
    const component = renderer.create(
        <MemoryRouter>
            <BookCard key="LeRokD4E2zRXdjw" book={books["LeRokD4E2zRXdjw"]} />
        </MemoryRouter>
    );
});

test("Renders the component", () => {
    const component = renderer.create(
        <MemoryRouter>
            <BookCard key="LeRokD4E2zRXdjw" book={books["LeRokD4E2zRXdjw"]} />
        </MemoryRouter>
    );

    const value = component.toJSON().find("h6").text();
    expect(value).toEqual(books["LeRokD4E2zRXdjw"].title);
});
