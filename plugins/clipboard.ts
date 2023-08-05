import { VueClipboard } from "@soerenmartius/vue3-clipboard";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueClipboard);
});
