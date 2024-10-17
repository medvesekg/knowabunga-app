import { useState } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Button from "./Button";

interface Props {
  selectedTime?: Date | null;
  onApply?: (dateTime: Date | null) => void;
}

export default function DatetimePicker({
  selectedTime = new Date(),
  onApply = () => {},
}: Props) {
  const [localSelected, setLocalSelected] = useState(selectedTime);

  return (
    <ReactDatePicker
      inline
      showTimeInput
      popperPlacement="left"
      selected={localSelected}
      onChange={(newTime: Date | null) => newTime && setLocalSelected(newTime)}
    >
      <div className="text-right">
        <Button
          style="primary"
          onClick={() => {
            onApply(localSelected);
          }}
        >
          Apply
        </Button>
      </div>
    </ReactDatePicker>
  );
}
