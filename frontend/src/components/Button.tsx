import classNames from "classnames";
import { PropsWithChildren } from "react";
import LoadingSpinner from "./LoadingSpinner";

interface ButtonProps extends PropsWithChildren {
  style?: keyof typeof buttonStyles | "";
  className?: string;
  onClick?: () => void;
  loading?: boolean;
  disabled?: boolean;
  title?: string;
}

const buttonStyles = {
  "": "",
  primary: "bg-primary text-text-primary",
  secondary: "bg-secondary text-text-primary",
  success: "bg-success",
  tertiary: "bg-background-secondary",
};

export default function Button({
  children,
  style = "",
  className = "",
  onClick = () => {},
  loading = false,
  disabled = false,
  title = "",
}: ButtonProps) {
  const defaultStyles = "rounded py-1 px-2 transition";

  const classes = classNames(defaultStyles, buttonStyles[style], className, {
    "hover:brightness-150": !disabled,
    "cursor-not-allowed": disabled,
    "brightness-50": disabled,
  });

  return (
    <button
      role="button"
      className={classNames(classes, "relative")}
      onClick={onClick}
      disabled={disabled}
      title={title}
    >
      {loading && (
        <div className="absolute right-0 left-0">
          <LoadingSpinner />
        </div>
      )}
      <span className={classNames({ invisible: loading })}>{children}</span>
    </button>
  );
}
