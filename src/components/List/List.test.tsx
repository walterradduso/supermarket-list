import React from "react";
import {render} from "@testing-library/react";
import {renderHook} from "@testing-library/react-hooks";

import List from "./List";
import useScrollTo from "./useScrollTo";

describe("List Tests", () => {
  test("should render snapshot", () => {
    const listRendered = render(<List itemsLength={4}>List</List>);

    expect(listRendered).toMatchSnapshot();
  });

  test("should render list with scroll", () => {
    const setScrollableList = jest.fn();
    const ref = {
      current: {
        scrollHeight: 1000,
        scrollTo: jest.fn(),
      },
    };

    renderHook(() =>
      useScrollTo({itemsLength: 20, listRefCurrent: ref.current, setScrollableList}),
    );

    expect(ref.current.scrollTo).toHaveBeenCalledTimes(1);
  });

  test("should render list without scroll", () => {
    const setScrollableList = jest.fn();
    const ref = {
      current: {
        scrollHeight: 400,
        scrollTo: jest.fn(),
      },
    };

    renderHook(() =>
      useScrollTo({itemsLength: 20, listRefCurrent: ref.current, setScrollableList}),
    );

    expect(setScrollableList).toHaveBeenCalledTimes(1);
  });
});
