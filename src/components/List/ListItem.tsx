import React from "react";

import deleteIcon from "../../assets/delete-icon.svg";

import styles from "./ListItem.module.scss";

interface Props {
  onRemove: VoidFunction;
}

const ListItem: React.FC<Props> = ({children, onRemove}) => {
  return (
    <li className={styles.container}>
      <span>{children}</span>

      <button onClick={onRemove}>
        <img alt="Delete item" src={deleteIcon} />
      </button>
    </li>
  );
};

export default ListItem;
