import { RootState } from "@/store/store";
import { availableThemes, setTheme } from "@/store/themeSlice";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";

export default function UserMenuThemeSelect() {
  const dispatch = useDispatch();
  const currentTheme = useSelector((state: RootState) => state.theme.current);

  return (
    <div>
      <span className="mr-2">Theme: </span>
      {availableThemes.map((availableTheme) => (
        <span
          key={availableTheme}
          className={classNames(
            "mr-2",
            "cursor-pointer",
            availableTheme === currentTheme
              ? "text-text-primary"
              : "text-text-secondary"
          )}
          onClick={() => dispatch(setTheme(availableTheme))}
        >
          {availableTheme}
        </span>
      ))}
    </div>
  );
}
