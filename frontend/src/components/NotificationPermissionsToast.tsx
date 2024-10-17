import {
  askToEnableNotifications,
  subscribeToPushNotifications,
} from "@/utils";
import Button from "./Button";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setDontBother } from "@/store/notificationsSlice";

interface Props {
  toastId: string;
}

export default function NotificationPermissionsToast({ toastId }: Props) {
  const dispatch = useDispatch();

  function close() {
    toast.dismiss(toastId);
  }

  function handleYesClick() {
    askToEnableNotifications()
      .then((permission) => {
        if (permission === "granted") {
          subscribeToPushNotifications();
        }
      })
      .finally(close);
  }

  function handleNoClick() {
    dispatch(setDontBother(true));
    close();
  }

  return (
    <div>
      <div className="mb-2">Enable notifications?</div>
      <div className="flex justify-between">
        <Button style="primary" onClick={handleYesClick}>
          Yes
        </Button>
        <Button
          style="tertiary"
          className="text-text-primary"
          onClick={handleNoClick}
        >
          No
        </Button>
      </div>
    </div>
  );
}
