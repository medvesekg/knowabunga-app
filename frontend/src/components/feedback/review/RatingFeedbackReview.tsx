import { GFeedbackItem } from "#/data/types";
import { getRgbCssFromCssVar } from "@/utils";
import React from "react";

interface RatingFeedbackReviewProps {
  values: GFeedbackItem<"rating">[];
  label: string;
  className: string;
}

const Chart = React.lazy(() => import("react-apexcharts"));

export default function RatingFeedbackReview({
  values,
  label,
  className,
}: RatingFeedbackReviewProps) {
  const options = {
    chart: {
      foreColor: getRgbCssFromCssVar("--color-text-primary"),
      animations: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      title: {
        text: "Rating",
      },
      categories: ["1 star", "2 stars", "3 stars", "4 stars", "5 stars"],
      labels: {
        trim: true,
      },
    },
    yaxis: {
      title: {
        text: "Number of votes",
      },
      tickAmount: 1,
    },
    tooltip: {
      enabled: false,
    },
  };

  const series = [
    {
      name: "series-1",
      color: getRgbCssFromCssVar("--color-primary"),
      data: countRatings(values),
    },
  ];

  return (
    <div className={className}>
      <div className="text-xl text-center">{label}</div>
      <Chart options={options} series={series} type="bar" />
    </div>
  );
}

function countRatings(values: GFeedbackItem<"rating">[]) {
  return values.reduce(
    (agg: [number, number, number, number, number], val) => {
      agg[val.value - 1]++;
      return agg;
    },
    [0, 0, 0, 0, 0]
  );
}
