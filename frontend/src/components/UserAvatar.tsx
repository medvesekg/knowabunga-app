import classNames from "classnames";

interface Props {
  picture: string;
  size?: number;
  className?: string;
  onClick?: () => void;
}

export function UserAvatar({
  picture,
  size = 8,
  className = "",
  onClick = () => {},
}: Props) {
  return (
    <div
      className={classNames(
        `rounded-full h-${size} w-${size} flex items-center justify-center bg-secondary overflow-hidden`,
        className
      )}
      onClick={onClick}
    >
      {picture && (
        <img src={picture} alt="User avatar" referrerPolicy="no-referrer" />
      )}
    </div>
  );
}
