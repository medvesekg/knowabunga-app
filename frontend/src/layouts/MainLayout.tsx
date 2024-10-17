import { PropsWithChildren } from "react";
import MenuBar from "../components/MenuBar";
import DefaultBackround from "./DefaultBackground";
import logoUrl from "@/assets/logo.png";
import { NavLink } from "react-router-dom";
import classNames from "classnames";
import { getAllScheduleItems } from "../../../data/api";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

export default function MainLayout({ children }: PropsWithChildren) {
  const user = useSelector((state: RootState) => state.auth.user);
  const myTalk = getAllScheduleItems().find(
    (item) =>
      item.type === "talk" &&
      item.speakers.map((speaker) => speaker.email).includes(user.email)
  );

  const menu = [
    {
      label: "Schedule",
      to: `/`,
      condition: true,
    },
    {
      label: "My talk",
      to: `/talks/${myTalk?.id}/view-feedback`,
      condition: myTalk,
    },
    /*
    {
      label: "Leet photos",
      to: `/photos`,
      condition: true,
    },
    */
  ];

  let visibleMenu = menu.filter((item) => item.condition);

  if (visibleMenu.length === 1 && visibleMenu[0].label === "Schedule") {
    // Dont show schedule link in menu if it is the only menu item
    visibleMenu = [];
  }

  return (
    <DefaultBackround>
      <MenuBar>
        <div className="flex grow justify-around">
          {visibleMenu.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              className={({ isActive }) =>
                classNames("mr-2", { underline: isActive })
              }
              end
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      </MenuBar>
      <div className="bg-primary">
        <div className="flex justify-center">
          <img src={logoUrl} className="max-h-56" />
        </div>
      </div>

      <div className="mx-auto pb-5">{children}</div>
    </DefaultBackround>
  );
}
