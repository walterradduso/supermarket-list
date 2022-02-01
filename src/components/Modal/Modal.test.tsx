import React from "react";
import {render, screen, fireEvent} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Modal from "./Modal";

describe("Modal Tests", () => {
  const onClose = jest.fn();

  test("render snapshot", () => {
    const modalRendered = render(<Modal onClose={onClose}>Modal</Modal>);

    expect(modalRendered).toMatchSnapshot();
  });

  test("should click outside of the modal and close it", () => {
    render(<Modal onClose={onClose}>Modal</Modal>);

    userEvent.click(screen.getByTestId("outside-modal"));

    expect(onClose).toBeCalledTimes(1);
  });

  test("should press the key escape and close the modal", () => {
    render(<Modal onClose={onClose}>Modal</Modal>);

    fireEvent.keyDown(screen.getByTestId("outside-modal"), {
      key: "Escape",
      code: "Escape",
      charCode: 27,
    });

    expect(onClose).toBeCalledTimes(1);
  });
});
