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
  pwa: {
    registerType: "prompt",
    manifest: {
      name: "DTTK",
      short_name: "DTTK",
      theme_color: "#ffffff",
      icons: [
        {
          src: "pwa-192x192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "pwa-512x512.png",
          sizes: "512x512",
          type: "image/png",
        },
        {
          src: "pwa-512x512.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "any maskable",
        },
      ],
    },
    workbox: {
      navigateFallback: "/",
      globPatterns: ["**/*.{js,css,html,png,svg,ico}"],
    },
    client: {
      installPrompt: true,
    },
    devOptions: {
      enabled: true,
      suppressWarnings: true,
      navigateFallbackAllowlist: [/^\/$/],
      type: "module",
    },
  },
});
