import { apiErrorHandler, postFeedbackForTalk } from "@/api";
import Button from "@/components/Button";
import { globImportComponents } from "@/utils";
import { capitalize } from "lodash-es";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useTitle } from "@/utils/hooks";
import { addFeedback } from "@/store/feedbackSlice";
import toast from "react-hot-toast";
import { getScheduleItem } from "#/data/api";
import feedbackSchema, { feedbackTypes } from "#/data/feedbackSchema";
import classNames from "classnames";
import { Feedback } from "#/data/types";
import { RootState } from "@/store/store";
import { format } from "date-fns";
import { GoBackButton } from "@/components/GoBackButton";

const feedbackComponents = globImportComponents(
  import.meta.glob("@/components/feedback/input/*", { eager: true })
);

export default function GiveFeedbackPage() {
  const { talkId } = useParams() as {
    talkId: string;
  };

  const [submitAttempts, setSubmitAttempts] = useState(0);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userFeedback = useSelector(
    (state: RootState) => state.feedback.feedback
  );
  const existingFeedback = userFeedback[talkId];

  const [formData, setFormData] = useState(existingFeedback?.content || {});
  const [formValidation, setFormValidation] = useState<{
    [key: string]: boolean;
  }>({});
  const [loading, setLoading] = useState(false);

  const talk = getScheduleItem(talkId);

  useTitle(talk?.title || "404 not found");

  const isReadyForFeedback = new Date() > new Date(talk?.to || 0);

  function handleChange(newValue: unknown, id: string) {
    const newFormData = { ...formData };
    newFormData[id] = newValue;
    setFormData(newFormData);
  }

  function handleSubmit() {
    setSubmitAttempts(submitAttempts + 1);
    if (!isFormValid()) {
      return toast.error("Please fill in all fields.");
    }

    setLoading(true);

    const feedback = feedbackSchema.reduce((feedback, schemaItem) => {
      feedback[schemaItem.id] = formData[schemaItem.id];
      return feedback;
    }, {} as Feedback);

    postFeedbackForTalk(talkId, feedback)
      .then(() => {
        dispatch(
          addFeedback({
            talkId: talkId,
            feedback: feedback,
          })
        );
        toast.success("Thank you for your feedback.");

        return navigate("/");
      })
      .catch(apiErrorHandler)
      .finally(() => setLoading(false));
  }
  function isFormValid() {
    return Object.values(validateForm()).every((item) => item === true);
  }

  function validateForm() {
    const validation = feedbackSchema.reduce((validation, schemaItem) => {
      const type = feedbackTypes[schemaItem.type];
      validation[schemaItem.id] = type.validation.safeParse(
        formData[schemaItem.id]
      ).success;
      return validation;
    }, {} as { [key: string]: boolean });
    setFormValidation(validation);
    return validation;
  }

  return (
    <div>
      {!isReadyForFeedback && (
        <div className="fixed inset-0 flex items-center justify-center p-5 z-10">
          <div className="bg-primary rounded-md p-5">
            <div className="mb-2">
              The talk is not yet open for feedback. Please come back after{" "}
              {format(new Date(talk?.to || 0), "do MMM yyyy HH:mm:ss")}.
            </div>
            <div className="text-center">
              <GoBackButton />
            </div>
          </div>
        </div>
      )}

      <div
        className={classNames("w-4/5 max-w-3xl mx-auto pt-5", {
          "blur-sm": !isReadyForFeedback,
        })}
      >
        <div className="mb-3" key={submitAttempts}>
          {feedbackSchema.map((item, i) => {
            const componentName = capitalize(item.type) + "FeedbackInput";
            const FeedbackComponent = feedbackComponents[componentName];
            return (
              <FeedbackComponent
                key={i}
                label={item.label}
                value={formData[item.id]}
                onChange={(newValue: unknown) =>
                  handleChange(newValue, item.id)
                }
                className={classNames("mb-8", {
                  shake: formValidation[item.id] === false,
                })}
              />
            );
          })}
        </div>
        <div>
          <Button
            style="primary"
            className="w-full"
            onClick={handleSubmit}
            loading={loading}
          >
            {existingFeedback ? "Update" : "Submit"}
          </Button>
        </div>
      </div>
    </div>
  );
}
