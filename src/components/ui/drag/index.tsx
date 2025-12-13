import {
  Children,
  cloneElement,
  isValidElement,
  PropsWithChildren,
  ReactElement,
  Ref,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { DragContext } from "./contexts";
import { useDragContext } from "./hooks";
import { Drag } from "../../../libs/dom";

export const DragContainer = ({ children }: PropsWithChildren) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [target, setTarget] = useState<HTMLElement | null>(null);

  const drag = useMemo(() => new Drag(), []);

  useEffect(() => {
    const container = containerRef.current;

    if (container == null || target == null) {
      return;
    }

    return drag.connect(container, target);
  }, [drag, target]);

  const value = useMemo(() => ({ setTarget, drag }), [setTarget, drag]);

  return (
    <DragContext.Provider value={value}>
      <div ref={containerRef}>{children}</div>
    </DragContext.Provider>
  );
};

export const DragTarget = ({ children }: PropsWithChildren) => {
  const { setTarget } = useDragContext();

  if (Children.count(children) !== 1) {
    throw new Error("DragTarget must have exactly one child");
  }

  return (
    <>
      {Children.map(children, (child) => {
        if (!isValidElement(child)) {
          return child;
        }

        return cloneElement<{ ref: Ref<HTMLElement | null> }>(
          child as ReactElement<{ ref: Ref<HTMLElement | null> }>,
          {
            ref: setTarget,
          }
        );
      })}
    </>
  );
};
