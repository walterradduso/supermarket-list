import React from "react";
import {render, screen, waitFor} from "@testing-library/react";

import App from "./App";

test("renders 'loading supermarket list' text", () => {
  render(<App />);

  const introElement = screen.getByText(/Loading supermarket list.../i);

  expect(introElement).toBeInTheDocument();
});

test("renders 'Add Item' text", async () => {
  render(<App />);

  await waitFor(() => expect(screen.getByText(/Add Item/i)).toBeInTheDocument());
});

test("render snapshot", async () => {
  const appRendered = render(<App />);

  expect(appRendered).toMatchSnapshot();
});
