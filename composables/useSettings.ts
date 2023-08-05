const current = {
  theme: "system" as "light" | "dark" | "system",
  invertToastColor: false,
  toastDuration: 5000,
};

type Settings = typeof current;

export const useSettings = () => {
  return {
    current,
    load() {
      const str = localStorage.getItem("settings");
      if (str !== null) {
        const settings = JSON.parse(str) as Settings;
        Object.assign(current, settings);
      }
      return current;
    },
    save() {
      localStorage.setItem("settings", JSON.stringify(current));
    },
  };
};
