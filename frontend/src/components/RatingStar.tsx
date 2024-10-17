import classNames from "classnames";

interface RatingStarProps {
  state: "empty" | "half" | "full";
  onMouseEnter?: () => void;
  onClick: () => void;
  className: string;
}

export default function RatingStar({
  state = "empty",
  onMouseEnter = () => {},
  onClick = () => {},
  className = "",
}: RatingStarProps) {
  const options = {
    empty: {
      icon: "star",
      style: {},
    },
    half: {
      icon: "star_rate_half",
      style: {},
    },
    full: {
      icon: "star",
      style: { fontVariationSettings: "'FILL' 1" },
    },
  };

  const style = options[state].style;
  const icon = options[state].icon;

  return (
    <span
      className={classNames("material-symbols-outlined", className)}
      style={style}
      onMouseEnter={onMouseEnter}
      onClick={onClick}
    >
      {icon}
    </span>
  );
}
