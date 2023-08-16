import React from "react";
import { render } from "@testing-library/react";
import Detail from "@Pokedex/pages/detail/[name]";

test("renders detail component correctly", () => {
    const { getByText } = render(<Detail />);
    const headingElement = getByText(/Pokemon Detail/i);
    expect(headingElement).toBeInTheDocument();
});
