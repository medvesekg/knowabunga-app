import { ScheduleItemWithRegion } from "#/data/types";

interface User {
  email: string;
  is_admin: boolean;
  region_id: string;
}

export function canViewFeedback(user: User, item: ScheduleItemWithRegion) {
  return isAdmin(user) || isSpeaker(user, item);
}

export function canGiveFeedback(user: User, item: ScheduleItemWithRegion) {
  return !isSpeaker(user, item) && isSameRegion(user, item);
}

export function isSpeaker(user: User, item: ScheduleItemWithRegion) {
  return ((item.type === "talk" && item.speakers) || [])
    .map((speaker) => speaker.email)
    .includes(user.email);
}

function isSameRegion(user: User, item: ScheduleItemWithRegion) {
  return item.region_id === user.region_id;
}

function isAdmin(user: User) {
  return user.is_admin;
}
