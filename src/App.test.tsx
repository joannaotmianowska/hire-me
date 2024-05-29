import React from "react";
import {render, screen} from "@testing-library/react";
import App from "./App";

test("renders app title", () => {
  render(<App />);
  const linkElement = screen.getByText(/Welcome to Your Nursery Dashboard/i);
  expect(linkElement).toBeInTheDocument();
});
