import React, {useEffect, useRef, useState} from "react";

import styles from "./List.module.scss";

interface Props {
  itemsLength: number;
}

const List: React.FC<Props> = ({children, itemsLength}) => {
  const listRef = useRef<HTMLUListElement>(null);
  const [scrollableList, setScrollableList] = useState<boolean>(false);

  useEffect(() => {
    if (listRef.current) {
      if (window.innerHeight - 200 < listRef.current.scrollHeight) {
        setScrollableList(true);

        listRef.current.scrollTo({top: listRef.current.scrollHeight, behavior: "smooth"});
      } else {
        setScrollableList(false);
      }
    }
  }, [itemsLength]);

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
