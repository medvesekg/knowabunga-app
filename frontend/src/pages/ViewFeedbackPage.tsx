import { getScheduleItem } from "#/data/api";
import feedbackSchema from "#/data/feedbackSchema";
import { getFeedbackForTalk } from "@/api";
import LoadingSpinner from "@/components/LoadingSpinner";
import DefaultContainer from "@/layouts/DefaultContainer";
import { globImportComponents } from "@/utils";
import { useLoadData, useTitle } from "@/utils/hooks";
import { capitalize } from "lodash-es";
import { useCallback } from "react";
import { useParams } from "react-router-dom";

const feedbackReviewComponents = globImportComponents(
  import.meta.glob("@/components/feedback/review/*", { eager: true })
);

export default function ViewFeedbackPage() {
  const { talkId } = useParams() as {
    talkId: string;
  };
  const [data, loading] = useLoadData(
    useCallback(() => getFeedbackForTalk(talkId), [talkId])
  );

  const talk = getScheduleItem(talkId);

  useTitle(talk?.title || "404 Not found");

  if (!talk) {
    return <div className="text-center">Not found</div>;
  }

  const aggregations = feedbackSchema.map((schemaItem, i) => {
    return {
      id: i,
      type: schemaItem.type,
      label: schemaItem.label,
      values: (data || []).map(
        (dataItem: {
          content: { [key: string]: unknown };
          user_id: string;
          user_email: string;
          user_name: string;
          user_picture: string;
        }) => ({
          value: dataItem.content[schemaItem.id],
          user: {
            id: dataItem.user_id,
            email: dataItem.user_email,
            name: dataItem.user_name,
            picture: dataItem.user_picture,
          },
        })
      ),
    };
  });

  if (loading) {
    return (
      <DefaultContainer className="flex items-center justify-center">
        <LoadingSpinner></LoadingSpinner>
      </DefaultContainer>
    );
  }

  if (!data || !data.length) {
    return (
      <DefaultContainer className="text-center">
        No ratings yet
      </DefaultContainer>
    );
  }

  return (
    <DefaultContainer>
      {aggregations.map((aggregation, i) => {
        const componentName = capitalize(aggregation.type) + "FeedbackReview";
        const FeedbackReviewComponent = feedbackReviewComponents[componentName];
        return (
          <FeedbackReviewComponent
            key={i}
            label={aggregation.label}
            values={aggregation.values}
            className="mb-10"
          />
        );
      })}
    </DefaultContainer>
  );
}
