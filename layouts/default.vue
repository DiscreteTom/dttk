<template>
  <v-layout>
    <v-app-bar>
      <template v-slot:prepend>
        <v-app-bar-nav-icon @click="drawer = !drawer" />
      </template>

      <v-app-bar-title>DTTK</v-app-bar-title>

      <template v-slot:append>
        <v-tooltip text="Toggle Theme" location="bottom">
          <template v-slot:activator="{ props }">
            <v-btn
              v-bind="props"
              icon="mdi-theme-light-dark"
              @click="themeManager.toggle"
            ></v-btn>
          </template>
        </v-tooltip>
        <v-tooltip text="Settings" location="bottom">
          <template v-slot:activator="{ props }">
            <v-btn
              v-bind="props"
              icon="mdi-cog-outline"
              @click="showSettings = !showSettings"
            ></v-btn>
          </template>
        </v-tooltip>
      </template>
    </v-app-bar>

    <!-- left drawer -->
    <v-navigation-drawer v-model="drawer">
      <v-list>
        <v-list-item
          v-for="page in pages"
          :key="page.text"
          exact
          :to="page.to"
          :prepend-icon="page.icon"
        >
          {{ page.text }}
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- right drawer -->
    <v-navigation-drawer v-model="showSettings" temporary location="right">
      <v-card-text>
        <v-text-field
          label="Toast duration (ms)"
          variant="solo"
          type="number"
          v-model="toastDuration"
        ></v-text-field>
        <v-checkbox
          label="Invert toast color"
          v-model="invertToastColor"
        ></v-checkbox>
        <v-checkbox
          label="Follow system theme"
          v-model="followSystemTheme"
        ></v-checkbox>
      </v-card-text>
    </v-navigation-drawer>

    <v-main>
      <v-container fluid>
        <slot />
      </v-container>
    </v-main>

    <!-- toaster -->
    <ClientOnly>
      <div :class="invertToastColor ? '' : 'normal-toast'">
        <VSonner position="bottom-right" :duration="toastDuration" />
      </div>
    </ClientOnly>
  </v-layout>
</template>

<script setup lang="ts">
// TODO: https://github.com/wobsoriano/vuetify-sonner/pull/4
import { VSonner, toast } from "vuetify-sonner";

const emitter = useEmitter();
const settings = useSettings();
const { followSystemTheme, ...themeManager } = useThemeManager();

const drawer = ref(false);
const showSettings = ref(false);
const invertToastColor = ref(false);
const toastDuration = ref(5000);
const pages = ref([
  {
    to: "/qrcode",
    icon: "mdi-qrcode",
    text: "QR Code Generator",
  },
]);

onMounted(() => {
  // load settings
  settings.load();
  invertToastColor.value = settings.current.invertToastColor;
  toastDuration.value = settings.current.toastDuration;

  // apply theme
  themeManager.init();

  emitter.on("toast", (message: string) =>
    toast(message, {
      action: {
        // TODO: https://github.com/wobsoriano/vuetify-sonner/pull/4
        label: "123",
        // TODO: https://github.com/wobsoriano/vuetify-sonner/pull/4
        onClick: () => {},
        buttonProps: {
          icon: "mdi-close",
          size: "small",
        },
      },
    })
  );
});
</script>

<style scoped>
.normal-toast :deep(.card-snackbar) {
  background: rgb(var(--v-theme-surface)) !important;
  color: rgba(
    var(--v-theme-on-surface),
    var(--v-high-emphasis-opacity)
  ) !important;
}
</style>
