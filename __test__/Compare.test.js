import React from "react";
import { render } from "@testing-library/react";
import Compare from "@Pokedex/pages/compare";

test("renders compare component correctly", () => {
    const { getByText } = render(<Compare />);
    const headingElement = getByText(/Compare Pokemon/i);
    expect(headingElement).toBeInTheDocument();
});
