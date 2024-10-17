import classNames from "classnames";
import { Link, useNavigate } from "react-router-dom";
import { getRegions } from "#/data/api";
import { useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import { RootState } from "@/store/store";

interface Props {
  regionId: string;
}

export default function RegionSelector({ regionId }: Props) {
  const regions = getRegions();
  const user = useSelector((state: RootState) => state.auth.user);

  const indicatorContainer = useRef<HTMLDivElement>(null);
  const indicator = useRef<HTMLDivElement>(null);
  const currentRegion = regions.find((region) => region.id === regionId);
  const currentRegionIndex = regions.findIndex(
    (region) => region.id === regionId
  );

  const navigate = useNavigate();

  useEffect(() => {
    function refreshIndicator(containerWidth: number) {
      if (indicator.current) {
        const width = containerWidth / regions.length;
        indicator.current.style.width = width + "px";
        const activeIndex = regions.findIndex(
          (region) => region.id === regionId
        );
        const offset = activeIndex * width;
        indicator.current.style.transform = `translateX(${offset}px)`;
        setTimeout(() => {
          if (indicator.current) {
            indicator.current.classList.add("transition-transform");
          }
        });
      }
    }

    if (indicatorContainer.current && indicator.current) {
      let firstRun = true;
      const observer = new ResizeObserver((entries) => {
        if (indicator.current) {
          if (!firstRun) {
            indicator.current.classList.remove("transition-transform");
          }

          refreshIndicator(entries[0].contentRect.width);

          if (!firstRun) {
            setTimeout(() => {
              if (indicator.current) {
                indicator.current.classList.add("transition-transform");
              }
            });
          }
          firstRun = false;
        }
      });
      observer.observe(indicatorContainer.current);
      return () => {
        observer.disconnect();
      };
    }
  }, [regions, regionId]);

  function isHomeRegion(regionId: string) {
    return user.region_id === regionId;
  }

  function nextRegion() {
    const nextRegion = regions[currentRegionIndex + 1];
    if (nextRegion) {
      navigate(`/${nextRegion.id}`);
    }
  }

  function prevRegion() {
    const nextRegion = regions[currentRegionIndex - 1];
    if (nextRegion) {
      navigate(`/${nextRegion.id}`);
    }
  }

  function nextRegionExists() {
    return currentRegionIndex < regions.length - 1;
  }

  function prevRegionExists() {
    return currentRegionIndex > 0;
  }

  return (
    <div>
      <div className="hidden sm:block">
        <div className="bg-primary">
          <div className="flex justify-around text-secondary text-lg break-all py-1">
            {regions.map((region) => (
              <Link
                key={region.id}
                to={`/${region.id}`}
                className={classNames("grow", "text-center")}
              >
                {isHomeRegion(region.id) && (
                  <span className="material-symbols-outlined align-top">
                    home
                  </span>
                )}

                <span>{region.name}</span>
              </Link>
            ))}
          </div>
          <div ref={indicatorContainer}>
            <div
              ref={indicator}
              className="border-b-4 border-secondary relative  duration-500 w-0"
            ></div>
          </div>
        </div>
      </div>
      <div className="sm:hidden bg-primary text-secondary text-lg flex justify-between px-4 py-1">
        <span
          className={classNames("material-symbols-outlined", {
            "text-text-secondary": !prevRegionExists(),
            "cursor-pointer": prevRegionExists(),
          })}
          onClick={prevRegion}
        >
          arrow_left_alt
        </span>
        <div>
          {isHomeRegion(currentRegion?.id || "") && (
            <span className="material-symbols-outlined align-top">home</span>
          )}{" "}
          {currentRegion?.name}
        </div>
        <span
          className={classNames("material-symbols-outlined", {
            "text-text-secondary": !nextRegionExists(),
            "cursor-pointer": nextRegionExists(),
          })}
          onClick={nextRegion}
        >
          arrow_right_alt
        </span>
      </div>
    </div>
  );
}
