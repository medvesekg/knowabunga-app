import { useState } from "react";

import { sendTestNotification } from "@/api";
import LoadingSpinner from "./LoadingSpinner";
import classNames from "classnames";

export default function TestNotificationButton() {
  const [loading, setLoading] = useState(false);
  function handleClick() {
    setLoading(true);
    sendTestNotification().finally(() => setLoading(false));
  }
  return (
    <div className="relative" onClick={handleClick}>
      {loading && (
        <span className="absolute left-0 right-0 text-center">
          <LoadingSpinner />
        </span>
      )}

      <span className={classNames({ invisible: loading })}>
        Send test notification
      </span>
    </div>
  );
}
