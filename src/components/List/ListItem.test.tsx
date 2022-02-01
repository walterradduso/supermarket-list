import React from "react";
import {render, screen, fireEvent} from "@testing-library/react";
import {renderHook} from "@testing-library/react-hooks";

import ListItem from "./ListItem";

describe("ListItem Tests", () => {
  const onRemove = jest.fn();

  test("should render snapshot", () => {
    const listItemRendered = render(<ListItem onRemove={onRemove}>List items</ListItem>);

    expect(listItemRendered).toMatchSnapshot();
  });

  test("should render snapshot with delete", () => {
    const listItemRendered = render(
      <ListItem deletingItem={true} onRemove={onRemove}>
        List items deleting
      </ListItem>,
    );

    expect(listItemRendered).toMatchSnapshot();
  });

  // test("should render list with scroll", () => {
  //   const setScrollableList = jest.fn();
  //   const ref = {
  //     current: {
  //       scrollHeight: 1000,
  //       scrollTo: jest.fn(),
  //     },
  //   };
  //
  //   renderHook(() =>
  //     useScrollTo({itemsLength: 20, listRefCurrent: ref.current, setScrollableList}),
  //   );
  //
  //   expect(ref.current.scrollTo).toHaveBeenCalledTimes(1);
  // });
  //
  // test("should render list without scroll", () => {
  //   const setScrollableList = jest.fn();
  //   const ref = {
  //     current: {
  //       scrollHeight: 400,
  //       scrollTo: jest.fn(),
  //     },
  //   };
  //
  //   renderHook(() =>
  //     useScrollTo({itemsLength: 20, listRefCurrent: ref.current, setScrollableList}),
  //   );
  //
  //   expect(setScrollableList).toHaveBeenCalledTimes(1);
  // });
});
