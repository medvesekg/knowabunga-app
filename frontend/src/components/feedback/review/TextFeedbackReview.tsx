import { UserAvatar } from "@/components/UserAvatar";

interface TextFeedbackReviewProps {
  values: {
    user: {
      picture: string;
      name: string;
    };
    value: string;
  }[];
  label: string;
  className: string;
}

export default function TextFeedbackReview({
  values,
  label,
  className,
}: TextFeedbackReviewProps) {
  return (
    <div className={className}>
      <div className="mb-5 text-xl text-center">{label}</div>
      <div>
        {values.map((item, i) => (
          <div key={i} className="flex gap-5 mb-8">
            <UserAvatar
              picture={item.user.picture}
              size={8}
              className="flex-none"
            />
            <div className="bg-background-secondary p-2 rounded-xl text-sm grow speech-bubble">
              <div className="text-sm mb-3">"{item.value}"</div>

              <div className="text-xs text-text-secondary text-right">
                {item.user.name}{" "}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
