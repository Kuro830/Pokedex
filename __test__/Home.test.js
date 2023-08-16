import React from "react";
import { render } from "@testing-library/react";
import Home from "@Pokedex/pages/index";

test("renders home component correctly", () => {
    const { getByText } = render(<Home />);
    const headingElement = getByText(/Pokedex/i);
    expect(headingElement).toBeInTheDocument();
});
