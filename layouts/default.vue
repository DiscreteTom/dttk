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
        <ClientOnly>
          <v-tooltip
            v-if="!$pwa?.isInstalled"
            text="Install PWA"
            location="bottom"
          >
            <template v-slot:activator="{ props }">
              <v-btn
                v-bind="props"
                icon="mdi-download"
                class="hidden-sm-and-down"
                @click="$pwa?.install()"
              ></v-btn>
            </template>
          </v-tooltip>
        </ClientOnly>
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
          @update:model-value="emitter.emit('toast', 'Toast color inverted')"
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
          @click="
            settings.reset();
            emitter.emit('toast', 'Reset settings');
          "
          hide-details
          block
          class="my-2"
          prepend-icon="mdi-restore"
        >
          Reset
        </v-btn>
        <ClientOnly>
          <v-btn
            hide-details
            block
            class="my-2"
            :prepend-icon="
              $pwa?.isInstalled
                ? $pwa?.needRefresh
                  ? 'mdi-refresh'
                  : 'mdi-check'
                : 'mdi-download'
            "
            :disabled="$pwa?.isInstalled && !$pwa?.needRefresh"
            @click="
              $pwa?.isInstalled
                ? $pwa?.updateServiceWorker(true)
                : $pwa?.install()
            "
            :text="
              $pwa?.isInstalled
                ? $pwa?.needRefresh
                  ? 'Refresh to Update'
                  : 'PWA Installed'
                : 'Install PWA'
            "
          >
          </v-btn>
        </ClientOnly>
        <ClientOnly>
          <v-btn
            hide-details
            block
            class="my-2"
            prepend-icon="mdi-update"
            @click="$pwa?.updateServiceWorker(true)"
            text="Force Update"
          >
          </v-btn>
        </ClientOnly>
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
      <ClientOnly>
        <VSonner
          position="bottom-right"
          :duration="settings.current.toastDuration"
        />
      </ClientOnly>
    </div>
  </v-layout>
</template>

<script setup lang="ts">
import { VSonner, toast } from "vuetify-sonner";

const nuxt = useNuxtApp();
const emitter = useEmitter();
const settings = useSettings();
const { followSystemTheme, ...themeManager } = useThemeManager();

const drawer = ref(false);
const showSettings = ref(false);
const pages = ref([
  {
    to: "/time",
    icon: "mdi-clock-outline",
    text: "Time Calculator",
  },
  {
    to: "/codec",
    icon: "mdi-message-text-lock-outline",
    text: "Text Codec",
  },
  {
    to: "/number",
    icon: "mdi-hexadecimal",
    text: "Number Convertor",
  },
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
  {
    to: "/ip",
    icon: "mdi-ip-outline",
    text: "IP Address Calculator",
  },
  {
    to: "/random",
    icon: "mdi-help-circle-outline",
    text: "Random Generator",
  },
  {
    to: "/recorder",
    icon: "mdi-file-video-outline",
    text: "Media Recorder",
  },
  {
    to: "/websocket",
    icon: "mdi-swap-vertical",
    text: "WebSocket Client",
  },
]);

function getURL() {
  return process.client ? window.location.href : "";
}

onMounted(() => {
  settings.load();

  // register toast event
  emitter.on("toast", (message: string) => {
    toast(message, {
      action: {
        buttonProps: {
          icon: "mdi-close",
          size: "small",
        },
      },
    });
  });

  // apply theme
  themeManager.init();
});

// check pwa update
watch(
  () => nuxt.$pwa.needRefresh,
  (value) => {
    if (value)
      emitter.emit("toast", "New content available, please refresh the page.");
  }
);
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
