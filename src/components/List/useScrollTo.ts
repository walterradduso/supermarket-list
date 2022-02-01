import {useEffect} from "react";

interface Props {
  itemsLength: number;
  listRefCurrent: HTMLUListElement | ListRef | null;
  setScrollableList(scrollableList: boolean): void;
}

interface ListRef {
  scrollHeight: number;
  scrollTo(): void;
}

export const useScrollTo = ({itemsLength, listRefCurrent, setScrollableList}: Props) => {
  useEffect(() => {
    if (listRefCurrent) {
      if (window.innerHeight - 200 < listRefCurrent.scrollHeight) {
        setScrollableList(true);

        listRefCurrent.scrollTo({top: listRefCurrent.scrollHeight, behavior: "smooth"});
      } else {
        setScrollableList(false);
      }
    }
  }, [itemsLength]);
};

export default useScrollTo;
