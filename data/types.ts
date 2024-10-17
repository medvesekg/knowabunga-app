import feedbackSchema, { feedbackTypes } from "./feedbackSchema";
import { z } from "zod";

export type FeedbackTypes = keyof typeof feedbackTypes;

export interface FeedbackTypeConfiguration {
  validation: z.ZodType;
}

export interface FeedbackSchemaItem {
  id: string;
  label: string;
  type: FeedbackTypes;
}

export interface GFeedbackItem<T extends FeedbackTypes> {
  id: string;
  label: string;
  type: T;
  value: z.infer<(typeof feedbackTypes)[T]["validation"]>;
}

export type FeedbackItem = {
  [K in FeedbackTypes]: GFeedbackItem<K>;
}[FeedbackTypes];

export type ValidValue<T extends FeedbackTypes> = z.infer<
  (typeof feedbackTypes)[T]["validation"]
>;

export type Feedback = {
  [SchemaItem in (typeof feedbackSchema)[number] as SchemaItem["id"]]: ValidValue<
    SchemaItem["type"]
  >;
};

export interface Schedule {
  [key: string]: {
    name: string;
    schedule: ScheduleItem[];
  };
}

export type ScheduleItem = ScheduleItemTalk | ScheduleItemBreak;

interface ScheduleItemCommon {
  id: string;
  title: string;
  from: string;
  to: string;
  location?: string;
  image: {
    url: string;
    verticalAlignment?: string;
  };
}

export type ScheduleItemTalk = ScheduleItemCommon & {
  description: string;
  speakers: Speaker[];
  tags: string[];
  type: "talk";
};

export type ScheduleItemBreak = ScheduleItemCommon & {
  type: "break";
};

export interface ScheduleItemWithRegionTalk extends ScheduleItemTalk {
  region_id: string;
}
export interface ScheduleItemWithRegionBreak extends ScheduleItemBreak {
  region_id: string;
}

export type ScheduleItemWithRegion =
  | ScheduleItemWithRegionTalk
  | ScheduleItemWithRegionBreak;

export interface Speaker {
  name: string;
  email: string;
}
