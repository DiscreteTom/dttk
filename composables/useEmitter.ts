import mitt from "mitt";
import { ToastProps } from "vuetify-sonner/dist/types";

export type Events = {
  toast: string | { message: string; props?: Partial<ToastProps> };
};

const emitter = mitt<Events>();

export const useEmitter = () => {
  return emitter;
};
