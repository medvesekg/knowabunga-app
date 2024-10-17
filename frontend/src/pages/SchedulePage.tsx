import { useNavigate, useParams } from "react-router-dom";
import DefaultContainer from "@/layouts/DefaultContainer";
import { getRegions, getScheduleForRegion } from "#/data/api";
import Schedule from "@/components/Schedule";
import RegionSelector from "@/components/RegionSelector";
import { usePrevious } from "@/utils/hooks";
import { useSwipeable } from "react-swipeable";

export default function SchedulePage() {
  const { regionId } = useParams() as {
    regionId: string;
  };

  const regions = getRegions();
  const schedule = getScheduleForRegion(regionId);
  const navigate = useNavigate();
  const currentIndex = regions.findIndex((region) => region.id === regionId);
  const prevIndex = usePrevious(currentIndex);

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => navigate(`/${nextRegionId()}`),
    onSwipedRight: () => navigate(`/${previousRegionId()}`),
    preventScrollOnSwipe: true,
  });

  function getAnimationClass() {
    if (prevIndex === null) {
      return "fade-in";
    }
    if (currentIndex > prevIndex) {
      return "slide-in-from-right";
    }
    if (currentIndex < prevIndex) {
      return "slide-in-from-left";
    }
  }

  function nextRegionId() {
    const nextId = Math.min(currentIndex + 1, regions.length - 1);
    return regions[nextId].id;
  }
  function previousRegionId() {
    const prevId = Math.max(currentIndex - 1, 0);
    return regions[prevId].id;
  }

  return (
    <div className="overflow-hidden" {...swipeHandlers}>
      <RegionSelector regionId={regionId} />
      <DefaultContainer className="text-center pt-10">
        <Schedule
          schedule={schedule}
          className={getAnimationClass()}
          key={regionId}
        />
      </DefaultContainer>
    </div>
  );
}
