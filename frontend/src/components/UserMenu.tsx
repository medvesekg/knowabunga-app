import classNames from "classnames";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ThemeSelect from "./ThemeSelect";
import TimeSelect from "./TimeSelect";
import NotificationsToggle from "./NotificationsToggle";
import TestNotificationButton from "./TestNotificationButton";
import {
  areNotificationsAvailable,
  areNotificationsEnabled,
  isDevelopment,
} from "@/utils";
import { RootState } from "@/store/store";

export default function UserMenu() {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <div
      className={classNames(
        "bg-background rounded-lg text-text-primary px-2 py-3"
      )}
    >
      <div className="text-right">
        <div className="text-sm">{user.name}</div>
        <div className="text-text-secondary text-xs">{user.email}</div>
      </div>

      <hr className="my-3" />

      {isDevelopment() && (
        <div className="mb-2 text-text-secondary">
          <TimeSelect />
        </div>
      )}
      <div className="mb-2">
        <ThemeSelect />
      </div>
      <div className="mb-2">
        <NotificationsToggle />
      </div>
      {areNotificationsAvailable() &&
        areNotificationsEnabled() &&
        isDevelopment() && (
          <div className="mb-2 cursor-pointer hover:brightness-150 ">
            <TestNotificationButton />
          </div>
        )}
      {user.is_admin && (
        <div className="mb-2 cursor-pointer hover:brightness-150">
          <Link to="/users">Admin</Link>
        </div>
      )}
      <div>
        <Link to="/logout" className="hover:brightness-150 mb-2">
          Logout
        </Link>
      </div>
    </div>
  );
}
