import { Link } from "react-router-dom";
import Button from "./Button";
import { useSelector } from "react-redux";
import classNames from "classnames";
import { RootState } from "@/store/store";

interface Props {
  talkId: string;
  className?: string;
  disabled?: boolean;
}

export default function RateButton({
  talkId,
  className = "",
  disabled = false,
}: Props) {
  const userFeedback = useSelector(
    (state: RootState) => state.feedback.feedback
  );
  const hasUserSubmittedFeedback = !!userFeedback[talkId];

  return (
    <Link
      to={`/talks/${talkId}/give-feedback`}
      className={classNames(className)}
      onClick={(e) => e.stopPropagation()}
    >
      {hasUserSubmittedFeedback ? (
        <Button style="success" disabled={disabled}>
          Edit
        </Button>
      ) : (
        <Button style="primary">Rate</Button>
      )}
    </Link>
  );
}
