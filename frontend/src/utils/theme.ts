import { setCssVar } from ".";

const themes = {
  light: {
    "--color-primary": "4 216 102",
    "--color-secondary": "29 46 140",
    "--color-text-primary": "0 0 0",
    "--color-background": "255 255 255",
  },
  dark: {
    "--color-primary": "29 46 140",
    "--color-secondary": "4 216 102",
    "--color-text-primary": "226 227 222",
    "--color-text-secondary": "156 156 156",
    "--color-background": "4 6 13",
    "--color-background-secondary": "76 76 76",
    "--color-success": "04 216 102",
    "--color-danger": "220 53 69",
  },
};

let currentTheme: keyof typeof themes = "dark";

export function changeTheme() {
  currentTheme = currentTheme === "dark" ? "light" : "dark";
  Object.entries(themes[currentTheme]).forEach(([cssVar, value]) =>
    setCssVar(cssVar, value)
  );
}
