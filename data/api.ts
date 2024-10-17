import { isKeyOf } from "../lib/utils";
import schedule from "./schedule";

export function getScheduleItem(itemId: string) {
  return getAllScheduleItems().find(
    (scheduleItem) => scheduleItem.id === itemId
  );
}

export function getScheduleForRegion(regionId: string) {
  return isKeyOf(regionId, schedule)
    ? schedule[regionId].schedule.map((item) => ({
        ...item,
        region_id: regionId,
      }))
    : [];
}

export function getAllScheduleItems() {
  return Object.entries(schedule).flatMap(([regionId, regionData]) => {
    return regionData.schedule.map((scheduleItem) => ({
      ...scheduleItem,
      region_id: regionId,
    }));
  });
}

export function getRegions() {
  return Object.entries(schedule).map(([regionId, regionData]) => {
    return {
      id: regionId,
      name: regionData.name,
    };
  });
}
