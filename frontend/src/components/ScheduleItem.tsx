import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import ItemDuration from "./ItemDuration";
import ItemLocation from "./ItemLocation";
import ItemTags from "./ItemTags";
import { useSelector } from "react-redux";
import { isSpeaker } from "@/utils/permissions";
import { ScheduleItemWithRegion } from "#/data/types";
import ItemButtons from "./ItemButtons";
import ItemAvatar from "./ItemAvatar";
import { RootState } from "@/store/store";
import { useTime } from "@/utils/hooks";

interface ScheduleItemProps {
  item: ScheduleItemWithRegion;
  className?: string;
}

export default function ScheduleItem({ item }: ScheduleItemProps) {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);

  function handleClick() {
    navigate(`/talks/${item.id}`);
  }
  const time = useTime();

  const isInProgress = time > new Date(item.from) && time < new Date(item.to);

  return (
    <div
      onClick={handleClick}
      className="last:mb-0 hover:bg-text-secondary/10 transition-colors cursor-pointer mb-10"
    >
      <div className="sm:flex items-top">
        <div>
          <ItemAvatar
            item={item}
            className={classNames("h-24 w-24 basis-24 mr-5 mb-2 sm:mb-0", {
              pulse: isInProgress,
            })}
            title={isInProgress ? "In progress" : ""}
          />
        </div>

        <div className="text-left grow">
          <div className="flex mb-3">
            <div className="grow">
              <div>
                <ItemDuration from={item.from} to={item.to} />
              </div>
              <div className="text-2xl mb-2">{item.title}</div>

              <div
                className={classNames("mb-2", {
                  "invisible hidden sm:block": !item.location,
                })}
              >
                <ItemLocation location={item.location} />
              </div>

              <div
                className={classNames("mb-2", {
                  "invisible hidden sm:block": item.type !== "talk",
                })}
              >
                <ItemTags tags={item.type === "talk" ? item.tags : []} />
              </div>
            </div>
            <div className="flex items-center">
              {isSpeaker(user, item) && (
                <span
                  className="material-symbols-outlined text-4xl"
                  title="This is your talk"
                >
                  volume_up
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div
        className={classNames("text-right mb-2", {
          "invisible hidden sm:block": item.type !== "talk",
        })}
      >
        <ItemButtons item={item} />
      </div>
    </div>
  );
}
