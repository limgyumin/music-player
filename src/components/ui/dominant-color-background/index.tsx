import { ComponentPropsWithRef, useEffect, useState } from "react";
import { getDominantColor, isDark } from "./helpers";
import styles from "./index.module.css";

type Props = ComponentPropsWithRef<"div"> & {
  source: string;
};

export const DominantColorBackground = ({
  ref,
  children,
  className,
  source,
  ...props
}: Props) => {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const setBodyColor = (color: string) => {
    document.body.style.transition = "background-color 0.5s ease-in-out";
    document.body.style.backgroundColor = color;
  };

  const resetBodyColor = () => {
    document.body.style.removeProperty("transition");
    document.body.style.removeProperty("background-color");
  };

  const update = async (source: string) => {
    const color = await getDominantColor({ source });

    if (color == null) {
      return;
    }

    setTheme(isDark(color) ? "dark" : "light");
    setBodyColor(color);
  };

  useEffect(() => {
    update(source);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [source]);

  useEffect(() => resetBodyColor, []);

  return (
    <div
      ref={ref}
      className={`${styles.container} ${className}`}
      data-theme={theme}
      {...props}
    >
      {children}
    </div>
  );
};
