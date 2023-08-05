<template>
  <div class="mx-3">
    <div class="d-flex flex-wrap justify-center flex-wrap">
      <v-textarea
        v-model="text"
        label="QR Code Content"
        variant="solo"
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
      <v-slider
        v-model="levelNumber"
        label="Level"
        :min="1"
        :max="4"
        show-ticks="always"
        :ticks="levelMap"
        :step="1"
      >
        <template v-slot:prepend>
          <v-btn
            size="small"
            variant="text"
            icon="mdi-minus"
            @click="
              levelNumber = (
                levelNumber > 1 ? levelNumber - 1 : levelNumber
              ) as LevelNumber
            "
          ></v-btn>
        </template>

        <template v-slot:append>
          <v-btn
            size="small"
            variant="text"
            icon="mdi-plus"
            @click="
              levelNumber = (
                levelNumber < 4 ? levelNumber + 1 : levelNumber
              ) as LevelNumber
            "
          ></v-btn>
        </template>
      </v-slider>
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

useDttkMeta({
  title: "QR Code Generator",
  description: "Free and simple online QR Code generator.",
  path: "/qrcode",
});

const text = ref("https://dttk.discretetom.com/qrcode");
const size = ref(300);
const margin = ref(2);
const marginStep = ref(1);
const minMargin = ref(0);
const maxMargin = ref(10);
const background = ref("#ffffff");
const foreground = ref("#000000");

type LevelNumber = 1 | 2 | 3 | 4;
const levelNumber = ref<LevelNumber>(4);
const levelMap = ref<Record<LevelNumber, Level>>({
  1: "L",
  2: "M",
  3: "Q",
  4: "H",
});
const level = computed<Level>(() => levelMap.value[levelNumber.value]);
</script>

<style scoped>
.code-input :deep(input) {
  font-family: monospace;
}
</style>
