import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getScheduleForRegion } from "#/data/api";
import toast from "react-hot-toast";
import { ScheduleItemWithRegionTalk } from "#/data/types";
import TalkFeedbackToast from "./TalkFeedbackToast";
import FakeTime from "@/utils/fake-time";
import { RootState } from "@/store/store";

function triggerToastNotification(talk: ScheduleItemWithRegionTalk) {
  toast((t) => <TalkFeedbackToast toastId={t.id} nextTalk={talk} />, {
    position: "bottom-center",
    duration: Infinity,
    style: {
      maxWidth: "600px",
    },
  });
}

export default function TalkFeedbackNotifier() {
  const [originTimestamp, setOriginTimestamp] = useState(new Date().getTime());
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    const callback = (fakeOrigin: Date) =>
      setOriginTimestamp(fakeOrigin.getTime());
    FakeTime.subscribe(callback);
    return () => FakeTime.unsubscribe(callback);
  }, []);

  function getFutureNotifiableTalks(
    user: { email: string; region_id: string },
    timestamp: number
  ): ScheduleItemWithRegionTalk[] {
    return getScheduleForRegion(user.region_id).filter(
      (item) =>
        item.type === "talk" &&
        new Date(item.to).getTime() > timestamp &&
        !item.speakers.map((speaker) => speaker.email).includes(user.email)
    ) as ScheduleItemWithRegionTalk[];
  }

  useEffect(() => {
    if (user) {
      const talks = getFutureNotifiableTalks(user, originTimestamp);
      const MAX_TIMEOUT = 2147483647;
      const timeouts: number[] = [];
      for (const talk of talks) {
        const wait = new Date(talk.to).getTime() - originTimestamp;
        if (wait < MAX_TIMEOUT) {
          const timeout = setTimeout(() => {
            triggerToastNotification(talk);
          }, wait);
          timeouts.push(timeout);
        }
      }

      return () => timeouts.forEach(clearTimeout);
    }
  }, [originTimestamp, user]);

  return null;
}
