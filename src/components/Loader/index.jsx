import React, { useEffect, useState } from "react";
import { useLoadingContext } from "../../contexts/loadingContext";
import styles from "./loader.module.css";

function Loader() {
  const [containerClass, setContainerClass] = useState(
    `${styles["container"]}  ${styles["hide"]}`
  );
  const { isLoading } = useLoadingContext();

  useEffect(() => {
    document.body.style.overflow = isLoading ? "hidden" : "auto";
    if (isLoading) return setContainerClass(`${styles["container"]}`);

    setTimeout(() => {
      setContainerClass(`${styles["container"]} ${styles["hide"]}`);
    }, 600);

    return () => {
      setContainerClass(`${styles["container"]} ${styles["hide"]}`);
    };
  }, [isLoading]);

  return (
    <div className={containerClass}>
      <div className={`${styles["loader-body"]}`}>
        <div className={`${styles["loader"]}`}>Loading...</div>
      </div>
    </div>
  );
}

export { Loader };
