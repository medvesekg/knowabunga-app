import { format } from "date-fns";

interface ItemDurationProps {
  from: string;
  to: string;
}

export default function ItemDuration({ from, to }: ItemDurationProps) {
  return (
    <span className="text-text-secondary">
      <span className="material-symbols-outlined mr-1 text-xl align-middle">
        schedule
      </span>
      <span className="align-middle text-sm">
        {format(new Date(from || 0), "HH:mm")}
        <span> - </span>
        {format(new Date(to || 0), "HH:mm")}
      </span>
    </span>
  );
}
