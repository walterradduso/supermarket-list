import React from "react";
import {render, screen, waitFor} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import App from "./App";

describe("App Tests", () => {
  test("render snapshot", async () => {
    const appRendered = render(<App />);

    expect(appRendered).toMatchSnapshot();
  });

  test("renders 'loading supermarket list' text", () => {
    render(<App />);

    const introElement = screen.getByText("Loading supermarket list items...");

    expect(introElement).toBeInTheDocument();
  });

  test("renders 'Add Item' text", async () => {
    render(<App />);

    await waitFor(() => expect(screen.getByText("Add Item")).toBeInTheDocument());
  });

  test("renders open and close modal", async () => {
    render(<App />);

    await waitFor(() => {
      userEvent.click(screen.getByText("Add Item"));
      expect(screen.getByText("Cancel")).toBeInTheDocument();

      userEvent.click(screen.getByText("Cancel"));
      expect(screen.queryByText("Cancel")).not.toBeInTheDocument();
    });
  });

  test("renders close modal clicking outside", async () => {
    render(<App />);

    await waitFor(() => {
      userEvent.click(screen.getByText("Add Item"));

      const outsideModal = document.querySelector("b");

      if (outsideModal) {
        outsideModal.click();
      }

      expect(screen.queryByText("Cancel")).not.toBeInTheDocument();
    });
  });
});
