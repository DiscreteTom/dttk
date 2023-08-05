<template>
  <v-layout>
    <v-app-bar>
      <template v-slot:prepend>
        <v-app-bar-nav-icon @click="drawer = !drawer" />
      </template>

      <v-app-bar-title>DTTK🛠️</v-app-bar-title>

      <template v-slot:append>
        <v-tooltip text="Home" location="bottom">
          <template v-slot:activator="{ props }">
            <v-btn v-bind="props" icon="mdi-home" to="/" exact></v-btn>
          </template>
        </v-tooltip>
        <v-tooltip text="Install PWA" location="bottom">
          <template v-slot:activator="{ props }">
            <v-btn
              v-bind="props"
              icon="mdi-download"
              class="hidden-sm-and-down"
              @click="$pwa.install()"
            ></v-btn>
          </template>
        </v-tooltip>
        <v-tooltip text="View Source Code" location="bottom">
          <template v-slot:activator="{ props }">
            <v-btn
              v-bind="props"
              icon="mdi-github"
              class="hidden-sm-and-down"
              href="https://github.com/DiscreteTom/dttk"
            ></v-btn>
          </template>
        </v-tooltip>
        <v-tooltip text="Toggle Theme" location="bottom">
          <template v-slot:activator="{ props }">
            <v-btn
              v-bind="props"
              icon="mdi-theme-light-dark"
              class="hidden-sm-and-down"
              @click="themeManager.toggle"
            ></v-btn>
          </template>
        </v-tooltip>
        <v-tooltip text="Copy URL" location="bottom">
          <template v-slot:activator="{ props }">
            <v-btn
              v-bind="props"
              icon="mdi-share-variant"
              v-clipboard:copy="getURL()"
              v-clipboard:success="() => emitter.emit('toast', 'Copied')"
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
          :model-value="settings.current.toastDuration"
          @input="settings.current.toastDuration = $event.target.valueAsNumber"
          hide-details
        ></v-text-field>
        <v-checkbox
          label="Invert toast color"
          v-model="settings.current.invertToastColor"
          hide-details
        ></v-checkbox>
        <v-checkbox
          label="Follow system theme"
          v-model="followSystemTheme"
          hide-details
        ></v-checkbox>
        <v-btn
          @click="themeManager.toggle"
          hide-details
          block
          class="my-2"
          prepend-icon="mdi-theme-light-dark"
        >
          Toggle Theme
        </v-btn>
        <v-btn
          @click="settings.reset"
          hide-details
          block
          class="my-2"
          prepend-icon="mdi-restore"
        >
          Reset
        </v-btn>
        <v-btn
          hide-details
          block
          class="my-2"
          prepend-icon="mdi-download"
          @click="$pwa.install()"
        >
          Install PWA
        </v-btn>
        <v-btn
          hide-details
          block
          class="my-2"
          prepend-icon="mdi-github"
          href="https://github.com/DiscreteTom/dttk"
        >
          View Source Code
        </v-btn>
      </v-card-text>
    </v-navigation-drawer>

    <v-main>
      <v-container fluid>
        <slot />
      </v-container>
    </v-main>

    <!-- toaster -->
    <div :class="settings.current.invertToastColor ? '' : 'normal-toast'">
      <VSonner
        position="bottom-right"
        :duration="settings.current.toastDuration"
      />
    </div>
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
const pages = ref([
  {
    to: "/qrcode",
    icon: "mdi-qrcode",
    text: "QR Code Generator",
  },
  {
    to: "/uuid",
    icon: "mdi-identifier",
    text: "UUID Generator",
  },
]);

function getURL() {
  return window.location.href;
}

onMounted(() => {
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
