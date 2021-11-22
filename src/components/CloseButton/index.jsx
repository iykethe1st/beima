import React from "react";
import { CloseIcon } from "../../assets/svg";
import styles from "./close-button.module.css";

function CloseButton({ onClick }) {
  return (
    <button className={`${styles["close-btn"]} p-3 m-3`} onClick={onClick}>
      <CloseIcon />
    </button>
  );
}

export { CloseButton };
