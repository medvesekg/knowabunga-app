import { PropsWithChildren } from "react";
import DefaultBackround from "./DefaultBackground";
import MenuBar from "@/components/MenuBar";
import { useNavigate, useLocation } from "react-router-dom";
import DefaultContainer from "./DefaultContainer";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { GoBackButton } from "@/components/GoBackButton";

export default function PageLayout({ children }: PropsWithChildren) {
  const title = useSelector((state: RootState) => state.title.content);

  return (
    <DefaultBackround>
      <MenuBar>
        <div className="text-secondary flex items-center h-full">
          <GoBackButton />
          <span className="grow text-center">{title}</span>
        </div>
      </MenuBar>
      <DefaultContainer className="fade-in-quick">{children}</DefaultContainer>
    </DefaultBackround>
  );
}
