import { ScheduleItem } from "#/data/types";
import classNames from "classnames";

interface Props {
  item: ScheduleItem;
  className?: string;
  style?: { [key: string]: string };
  title?: string;
}

export default function ItemAvatar({
  item,
  className = "",
  style = {},
  title = "",
}: Props) {
  return (
    <div
      className={classNames("rounded-full", className)}
      style={{
        ...style,
        background: `url(${item.image}) no-repeat center center, rgb(var(--color-background-secondary))`,
        backgroundSize: "cover",
      }}
      title={title}
    />
  );
}
