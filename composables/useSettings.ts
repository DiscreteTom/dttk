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
      console.log(`Settings loaded: ${str}`);
      if (str !== null) {
        const settings = JSON.parse(str) as Settings;
        Object.assign(current, settings);
      }
      console.log(`Settings applied: ${JSON.stringify(current)}`);
      return current;
    },
    save() {
      localStorage.setItem("settings", JSON.stringify(current));
      console.log(`Settings saved: ${JSON.stringify(current)}`);
    },
  };
};
