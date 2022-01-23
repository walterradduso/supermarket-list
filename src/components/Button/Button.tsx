import React, {useEffect, useRef} from "react";

import styles from "./Button.module.scss";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  colorScheme?: "primary" | "secondary";
  focusButton?: boolean;
  fullWidth?: boolean;
}

const Button: React.FC<Props> = ({
  children,
  colorScheme = "secondary",
  focusButton = false,
  fullWidth = false,
  ...props
}) => {
  const addItemButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (addItemButton.current && focusButton) {
      addItemButton.current.focus();
    }
  }, [focusButton]);

  return (
    <button
      ref={addItemButton}
      className={`${styles.container} ${styles[colorScheme]} ${fullWidth && styles.fullWidth}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
