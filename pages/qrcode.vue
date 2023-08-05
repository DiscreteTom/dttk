<template>
  <div class="mx-3">
    <div class="d-flex justify-center align-center flex-wrap">
      <v-textarea
        v-model="text"
        label="QR Code Content"
        variant="solo"
        hide-details
        clearable
        clear-icon="mdi-close-circle"
        counter
        no-resize
        rows="11"
      />
      <div
        style="border: solid 1px white"
        class="mx-3"
        :style="`height: ${size + 2}px`"
      >
        <qrcode-vue
          :value="text"
          :size="size"
          :level="level"
          :margin="margin"
          :background="background"
          :foreground="foreground"
        />
      </div>
    </div>

    <!-- controls -->
    <div class="my-3">
      <v-select
        label="Level"
        v-model="level"
        :items="['L', 'M', 'Q', 'H']"
        variant="solo"
      />
      <v-slider
        v-model="margin"
        label="Margin"
        :min="minMargin"
        :max="maxMargin"
        :step="marginStep"
        thumb-label
        show-ticks="always"
      >
        <template v-slot:prepend>
          <v-btn
            size="small"
            variant="text"
            icon="mdi-minus"
            @click="
              margin = margin > minMargin ? margin - marginStep : minMargin
            "
          ></v-btn>
        </template>

        <template v-slot:append>
          <v-btn
            size="small"
            variant="text"
            icon="mdi-plus"
            @click="
              margin = margin < maxMargin ? margin + marginStep : maxMargin
            "
          ></v-btn>
        </template>
      </v-slider>

      <v-text-field
        class="code-input my-3"
        label="Background"
        variant="solo"
        placeholder="#ffffff"
        clearable
        hint="CSS color value"
        v-model="background"
      ></v-text-field>
      <v-text-field
        class="code-input"
        label="Foreground"
        variant="solo"
        clearable
        placeholder="#000000"
        hint="CSS color value"
        v-model="foreground"
      ></v-text-field>
    </div>
  </div>
</template>

<script setup lang="ts">
import QrcodeVue, { Level } from "qrcode.vue";

const text = ref("https://dttk.discretetom.com/qrcode");
const size = ref(300);
const level = ref<Level>("H");
const margin = ref(2);
const marginStep = ref(1);
const minMargin = ref(0);
const maxMargin = ref(10);
const background = ref("#ffffff");
const foreground = ref("#000000");
</script>

<style scoped>
.code-input :deep(input) {
  font-family: monospace;
}
</style>
