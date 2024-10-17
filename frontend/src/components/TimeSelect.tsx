import { useClickAnywhere, useTime } from "@/utils/hooks";
import { format } from "date-fns";
import { useState } from "react";
import DatetimePicker from "./DatetimePicker";
import FakeTime from "@/utils/fake-time";

export default function TimeSelect() {
  const currentTime = useTime();
  useClickAnywhere(() => setIsOpen(false));

  const [isOpen, setIsOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState<Date | null>(null);

  return (
    <div className="relative" onClick={(e) => e.stopPropagation()}>
      <div
        className="cursor-pointer"
        onClick={() => {
          setIsOpen(!isOpen);
          setSelectedTime(currentTime);
        }}
      >
        {format(currentTime, "do MMM yyyy HH:mm:ss")}
      </div>
      {isOpen && (
        <div className="absolute z-10">
          <DatetimePicker
            key={selectedTime?.getTime()}
            selectedTime={selectedTime}
            onApply={(dateTime) => {
              setIsOpen(false);
              setSelectedTime(dateTime);
              FakeTime.set(
                new Date(
                  Math.floor((dateTime?.getTime() || 0) / 60000) * 60000 + 55000
                )
              );
            }}
          />
        </div>
      )}
    </div>
  );
}
