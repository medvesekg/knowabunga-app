import { FeedbackSchemaItem, FeedbackTypeConfiguration } from "./types";
import { z } from "zod";

export const feedbackTypes = {
  text: {
    validation: z.string().trim().min(1),
  },
  rating: {
    validation: z.number().min(1).max(5),
  },
} satisfies { [key: string]: FeedbackTypeConfiguration };

const feedbackSchema = [
  {
    id: "usefulness",
    label: "How useful was the content for your daily work?",
    type: "rating",
  },
  {
    id: "clarity",
    label: "How clear and engaging was the speaker?",
    type: "rating",
  },
  {
    id: "application",
    label: "How likely are you to apply what you learned in your work?",
    type: "rating",
  },
  {
    id: "likes",
    label: "What did you like in the speech? Consider content and delivery.",
    type: "text",
  },
  {
    id: "improvements",
    label: "What could be improved? Consider content and delivery.",
    type: "text",
  },
] satisfies FeedbackSchemaItem[];

export default feedbackSchema;
