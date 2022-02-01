import React from "react";

import styles from "./Modal.module.scss";

interface Props {
  onClose: VoidFunction;
}

const Modal: React.FC<Props> = ({children, onClose}) => {
  return (
    <section
      className={styles.container}
      data-testid="modal"
      onKeyDown={(e) => e.key === "Escape" && onClose()}
    >
      <b data-testid="outside-modal" onClick={onClose} />
      <article>{children}</article>
    </section>
  );
};

export default Modal;
