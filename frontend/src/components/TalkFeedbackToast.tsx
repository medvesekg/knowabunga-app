import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { ScheduleItemWithRegionTalk } from "#/data/types";

interface Props {
  nextTalk: ScheduleItemWithRegionTalk;
  toastId: string;
}

export default function TalkFeedbackToast({ nextTalk, toastId }: Props) {
  return (
    <div className="flex">
      <div>
        It is time for you to give your feedback for the talk from{" "}
        {nextTalk.speakers.map((speaker) => speaker.name).join(", ")}:{" "}
        <b>{nextTalk.title}</b>. Please submit the feedback{" "}
        <Link
          to={`/talks/${nextTalk.id}/give-feedback`}
          className="text-primary hover:brightness-150 font-bold"
          onClick={() => toast.dismiss(toastId)}
        >
          here
        </Link>
        .
      </div>

      <div className="text-right">
        <span className="cursor-pointer" onClick={() => toast.dismiss(toastId)}>
          <span className="material-symbols-outlined">close</span>
        </span>
      </div>
    </div>
  );
}
