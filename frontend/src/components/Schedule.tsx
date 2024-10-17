import classNames from "classnames";
import { format } from "date-fns";
import { groupBy } from "lodash-es";
import ScheduleItem from "./ScheduleItem";
import { ScheduleItemWithRegion } from "#/data/types";

interface Props {
  schedule: ScheduleItemWithRegion[];
  className?: string;
}

export default function Schedule({ schedule, className = "" }: Props) {
  const dailySchedules = Object.values(
    groupBy(schedule, (item) => format(new Date(item?.from || 0), "yyyy-MM-dd"))
  );
  return (
    <div className={className}>
      {dailySchedules.map((dailySchedule, i) => {
        return (
          <div
            key={i}
            className={classNames({
              "mb-10": i < dailySchedules.length - 1,
            })}
          >
            {dailySchedules.length > 1 && (
              <div className="mb-8 text-4xl font-bold">
                {format(new Date(dailySchedule[0]?.from || 0), "EEEE")}
              </div>
            )}

            {dailySchedule.map((item) => (
              <ScheduleItem key={item.id} item={item} />
            ))}
          </div>
        );
      })}
    </div>
  );
}
