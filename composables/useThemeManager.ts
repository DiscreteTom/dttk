import { useTheme } from "vuetify";

function getSystemTheme() {
  return window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export const useThemeManager = () => {
  const theme = useTheme();
  const settings = useSettings();

  const followSystemTheme = ref(true);

  function set(target: "light" | "dark" | "system") {
    // update state
    theme.global.name.value = target == "system" ? getSystemTheme() : target;
    followSystemTheme.value = target == "system";

    // update settings
    settings.current.theme = target;
  }

  function toggle() {
    set(theme.global.name.value == "light" ? "dark" : "light");
  }

  function init() {
    // apply settings
    set(settings.current.theme);

    // listen to system theme changes
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", () => set("system"));
  }

  watch(followSystemTheme, (value) => {
    if (value) set("system");
    else set(theme.global.name.value == "dark" ? "dark" : "light");
  });

  watch(settings.current, (value) => {
    set(value.theme);
  });

  return {
    followSystemTheme,
    init,
    set,
    toggle,
  };
};
