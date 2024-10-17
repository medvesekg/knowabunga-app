import { canGiveFeedback, canViewFeedback } from "@/utils/permissions";
import Button from "./Button";
import ReviewButton from "./ReviewButton";
import { ScheduleItemWithRegion } from "#/data/types";
import RateButton from "./RateButton";

import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

interface Props {
  item: ScheduleItemWithRegion;
}

export default function ItemButtons({ item }: Props) {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <div className="flex justify-end gap-x-5 gap-y-3 flex-wrap">
      <Button className="invisible">#</Button>
      {canViewFeedback(user, item) && <ReviewButton talkId={item.id} />}
      {canGiveFeedback(user, item) && <RateButton talkId={item.id} />}
    </div>
  );
}
