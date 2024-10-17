import { Link } from "react-router-dom";
import Button from "./Button";

interface Props {
  talkId: string;
  className?: string;
  disabled?: boolean;
}

export default function ReviewButton({ talkId, className = "" }: Props) {
  return (
    <Link
      to={`/talks/${talkId}/view-feedback`}
      onClick={(e) => e.stopPropagation()}
    >
      <Button style="tertiary" className={className}>
        View ratings
      </Button>
    </Link>
  );
}
