// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  devtools: { enabled: true },
  css: [
    "vuetify/lib/styles/main.sass",
    "@mdi/font/css/materialdesignicons.min.css",
    // TODO: https://github.com/wobsoriano/vuetify-sonner/pull/5
    "vuetify-sonner/dist/index.css",
  ],
  build: {
    transpile: ["vuetify", "vue-sonner"],
  },
  vite: {
    define: {
      "process.env.DEBUG": false,
    },
  },
  app: {
    baseURL: "/dttk/",
    cdnURL: "https://dttk.discretetom.com/",
  },
  modules: ["@vite-pwa/nuxt"],
  pwa: {},
});
