import React from "react";

import Spinner from "../Spinner";
import deleteIcon from "../../assets/delete-icon.svg";

import styles from "./ListItem.module.scss";

interface Props {
  deletingItem?: boolean;
  onRemove: VoidFunction;
}

const ListItem: React.FC<Props> = ({children, deletingItem = false, onRemove}) => {
  return (
    <li className={styles.container}>
      <span>{children}</span>

      <button onClick={onRemove}>
        {deletingItem ? <Spinner /> : <img alt="Delete item image" src={deleteIcon} />}
      </button>
    </li>
  );
};

export default ListItem;
