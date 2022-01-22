import React from "react";

import spinner from "../../assets/spinner.gif";

import styles from "./Spinner.module.scss";

interface Props {
  label: string;
}

const Spinner: React.FC<Props> = ({label}) => {
  return (
    <div className={styles.spinner}>
      <img alt="Spinner" src={spinner} />
      <span>{label}</span>
    </div>
  );
};

export default Spinner;
