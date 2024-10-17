interface TextFeedbackInputProps {
  label: string;
  className: string;
  value: string;
  onChange: (value: string) => void;
}

export default function TextFeedbackInput({
  label,
  className,
  value,
  onChange,
}: TextFeedbackInputProps) {
  return (
    <div className={className}>
      <div className="mb-2">
        {label}&nbsp;
        <span className="text-danger ml-1" title="Required">
          *
        </span>
      </div>
      <div className="text-center">
        <textarea
          value={value}
          className="min-h-32 bg-background-secondary text-text-primary w-full outline-none focus:outline-secondary p-1 rounded"
          onInput={(e) => onChange((e.target as HTMLInputElement).value)}
        />
      </div>
    </div>
  );
}
