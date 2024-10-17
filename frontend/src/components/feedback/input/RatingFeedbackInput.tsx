import RatingStar from "@/components/RatingStar";

interface RatingFeedbackInputProps {
  label: string;
  className: string;
  onChange: (value: number) => void;
  value: number;
}

export default function RatingFeedbackInput({
  label,
  className = "",
  onChange,
  value,
}: RatingFeedbackInputProps) {
  return (
    <div className={className}>
      <div className="mb-1">
        {label}&nbsp;
        <span className="text-danger ml-1" title="Required">
          *
        </span>
      </div>
      <div className="text-center mb-1 flex justify-between">
        <div className="grow flex justify-end items-end text-sm text-text-secondary">
          Not at all
        </div>
        <div className="px-2 rounded-2xl mx-2 flex text-secondary">
          {Array(5)
            .fill(0)
            .map((_, i) => (
              <RatingStar
                key={i}
                state={i + 1 <= value ? "full" : "empty"}
                onClick={() => onChange(i + 1)}
                className="cursor-pointer"
              />
            ))}
        </div>
        <div className="grow flex justify-start items-end text-sm text-text-secondary">
          Very much
        </div>
      </div>
    </div>
  );
}
