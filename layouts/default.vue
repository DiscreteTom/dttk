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
              @click="toggleTheme"
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
        <v-checkbox
          label="Invert toast color"
          v-model="invertToastColor"
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
        <VSonner position="bottom-right" :duration="5000" />
      </div>
    </ClientOnly>
  </v-layout>
</template>

<script setup lang="ts">
import { useTheme } from "vuetify";
// TODO: https://github.com/wobsoriano/vuetify-sonner/pull/4
import { VSonner, toast } from "vuetify-sonner";

const theme = useTheme();
const emitter = useEmitter();

const drawer = ref(false);
const showSettings = ref(false);
const invertToastColor = ref(false);
const pages = ref([
  {
    to: "/qrcode",
    icon: "mdi-qrcode",
    text: "QR Code Generator",
  },
]);

function toggleTheme() {
  theme.global.name.value = theme.global.current.value.dark ? "light" : "dark";
}

onMounted(() => {
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
