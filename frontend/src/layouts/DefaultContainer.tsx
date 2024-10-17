import classNames from "classnames";
import { PropsWithChildren } from "react";

export default function DefaultContainer({
  children,
  className = "",
}: PropsWithChildren<{ className?: string }>) {
  return (
    <div className={classNames("mx-auto max-w-3xl w-4/5 py-5", className)}>
      {children}
    </div>
  );
}
