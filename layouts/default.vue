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
      </template>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer"> </v-navigation-drawer>

    <v-main>
      <v-container fluid>
        <slot />
      </v-container>
    </v-main>
  </v-layout>
</template>

<script setup lang="ts">
import { useTheme } from "vuetify";

const drawer = ref(false);

const theme = useTheme();

function toggleTheme() {
  theme.global.name.value = theme.global.current.value.dark ? "light" : "dark";
}
</script>
