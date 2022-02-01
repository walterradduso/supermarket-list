import React, {useRef, useState} from "react";

import styles from "./List.module.scss";
import useScrollTo from "./useScrollTo";

interface Props {
  itemsLength: number;
}

const List: React.FC<Props> = ({children, itemsLength}) => {
  const listRef = useRef<HTMLUListElement>(null);
  const [scrollableList, setScrollableList] = useState<boolean>(false);

  useScrollTo({itemsLength, listRefCurrent: listRef.current, setScrollableList});

  return (
    <ul
      ref={listRef}
      className={`${styles.container} ${scrollableList && styles.containerScrollable}`}
    >
      {children}
    </ul>
  );
};

export default List;
