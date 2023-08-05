const defaultSettings = {
  theme: "system" as "system" | "light" | "dark",
  invertToastColor: false,
  toastDuration: 5000,
};
type Settings = typeof defaultSettings;

const current = reactive({ ...defaultSettings });
let loaded = false;

function load() {
  const str = localStorage.getItem("settings");
  console.log(`Settings loaded: ${str}`);
  if (str !== null) {
    const obj = JSON.parse(str) as Settings;
    Object.assign(current, obj);
  }
  console.log(`Settings applied: ${JSON.stringify(current)}`);
  return current;
}

function save() {
  localStorage.setItem("settings", JSON.stringify(current));
  console.log(`Settings saved: ${JSON.stringify(current)}`);
}

function reset() {
  Object.assign(current, defaultSettings);
  console.log(`Settings reset: ${JSON.stringify(current)}`);
  save();
}

export const useSettings = () => {
  if (!loaded) {
    load();
    loaded = true;
    watch(current, save);
  }

  return {
    current,
    load,
    save,
    reset,
  };
};
