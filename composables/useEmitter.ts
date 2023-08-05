import mitt from "mitt";

export type Events = {
  toast: string;
};

const emitter = mitt<Events>();

export const useEmitter = () => {
  return emitter;
};
