import { ComponentPropsWithoutRef, forwardRef } from "react";
import styles from "./index.module.css";

type Props = ComponentPropsWithoutRef<"input">;

export const Slider = forwardRef<HTMLInputElement, Props>(
  ({ value = 0, max = 100, type = "range", className, ...props }, ref) => {
    return (
      <div className={styles.slider__container}>
        <div className={styles.slider__track} />

        <div
          className={styles.slider__progress}
          style={{
            width: `${(Number(value) / Number(max)) * 100}%`,
          }}
        />

        <input
          ref={ref}
          className={`${styles.slider__input} ${className}`}
          type={type}
          value={value}
          max={max}
          {...props}
        />
      </div>
    );
  }
);
