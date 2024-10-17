import { useClickAnywhere } from "@/utils/hooks";
import classNames from "classnames";
import { PropsWithChildren, useState } from "react";
import { useSelector } from "react-redux";
import UserMenu from "./UserMenu";
import { UserAvatar } from "./UserAvatar";
import { RootState } from "@/store/store";

export default function MenuBar({ children }: PropsWithChildren) {
  const [expanded, setExpanded] = useState(false);

  const user = useSelector((state: RootState) => state.auth.user);

  useClickAnywhere(() => setExpanded(false));

  function toggleExpanded() {
    setExpanded(!expanded);
  }

  return (
    <div className="flex sticky bg-primary top-0 w-full px-3 py-2 gap-2 z-20">
      <div className="grow">{children}</div>
      <div onClick={(e) => e.stopPropagation()}>
        <UserAvatar
          picture={user.picture}
          size={8}
          className="cursor-pointer"
          onClick={toggleExpanded}
        />
        <div
          className={classNames(
            "absolute right-2 transition-opacity overflow-visible",
            expanded ? "opacity-100 visible" : "opacity-0 invisible"
          )}
        >
          <UserMenu />
        </div>
      </div>
    </div>
  );
}
