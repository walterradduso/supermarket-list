import React from "react";

import styles from "./Spinner.module.scss";

interface Props {
  label?: string;
  colorScheme?: "primary" | "secondary";
}

const Spinner: React.FC<Props> = ({colorScheme = "secondary", label}) => {
  return (
    <div className={styles.container}>
      <div className={styles.spinnerContainer}>
        <span className={`${styles.spinner} ${styles[colorScheme]}`} />
      </div>

      {label && <span>{label}</span>}
    </div>
  );
};

export default Spinner;
