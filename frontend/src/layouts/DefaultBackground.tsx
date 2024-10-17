import bgUrl from "@/assets/bg.png";
import classNames from "classnames";
import { PropsWithChildren } from "react";

export default function DefaultBackround({
  children,
  className,
}: PropsWithChildren & { className?: string }) {
  return (
    <div
      className={classNames("min-h-screen text-text-primary", className)}
      style={{
        background: `linear-gradient(to top, rgb(var(--color-background) / 0.6), rgb(var(--color-background) / 0.6)), url(${bgUrl})`,
      }}
    >
      {children}
    </div>
  );
}
