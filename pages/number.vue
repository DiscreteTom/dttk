<template>
  <div>
    <!-- form -->
    <div class="mx-2">
      <div class="d-flex mb-3">
        <v-row no-gutters>
          <v-col :cols="display.smAndDown.value ? 12 : 4">
            <v-select
              label="From"
              :items="Object.keys(result)"
              variant="outlined"
              density="compact"
              hide-details
              v-model="fromFormat"
              :class="display.smAndDown.value ? 'mb-3' : 'mr-3'"
            />
          </v-col>
          <v-col :cols="display.smAndDown.value ? 12 : 8">
            <v-text-field
              label="Value"
              v-model="fromValue"
              variant="outlined"
              density="compact"
              hide-details
              @input="calculate"
            />
          </v-col>
        </v-row>
      </div>
    </div>

    <!-- cards -->
    <div class="d-flex flex-wrap">
      <v-card
        v-for="(value, name) in result"
        :key="name"
        class="mx-2 my-2 flex-grow-1"
      >
        <v-card-title>
          {{ name }}
          <v-tooltip text="Copy" location="top">
            <template v-slot:activator="{ props }">
              <v-btn
                v-bind="props"
                variant="plain"
                icon="mdi-content-copy"
                v-clipboard:copy="value"
                v-clipboard:success="() => emitter.emit('toast', 'Copied')"
              >
              </v-btn>
            </template>
          </v-tooltip>
        </v-card-title>
        <v-card-text>
          {{ value }}
        </v-card-text>
      </v-card>

      <v-card
        v-for="(item, i) in custom"
        :key="i"
        class="mx-2 my-2 flex-grow-1"
      >
        <v-card-title class="d-flex">
          <v-text-field
            v-model="item.base"
            label="Base (2-36)"
            variant="outlined"
            density="compact"
            type="number"
            hide-details
            class="mr-3"
            @input="calculate"
          />
          <v-tooltip text="Copy" location="top">
            <template v-slot:activator="{ props }">
              <v-btn
                v-bind="props"
                variant="plain"
                icon="mdi-content-copy"
                v-clipboard:copy="item.txt"
                v-clipboard:success="() => emitter.emit('toast', 'Copied')"
              >
              </v-btn>
            </template>
          </v-tooltip>
          <v-tooltip text="Remove" location="top">
            <template v-slot:activator="{ props }">
              <v-btn
                v-bind="props"
                variant="plain"
                icon="mdi-close"
                @click="custom.splice(i, 1)"
              >
              </v-btn>
            </template>
          </v-tooltip>
        </v-card-title>
        <v-card-text>
          {{ item.txt }}
        </v-card-text>
      </v-card>
      <v-card
        class="mx-2 my-2 flex-grow-1 d-flex align-center justify-center"
        style="min-height: 100px"
        hover
        @click="
          custom.push({ base: 2, txt: '' });
          calculate();
        "
      >
        <v-icon> mdi-plus </v-icon>
        <v-card-subtitle> Custom Base </v-card-subtitle>
      </v-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDisplay } from "vuetify";

useDttkMeta({
  title: "Number Convertor",
  description:
    "Free online number convertor. Convert between binary, ternary, quaternary, octal, decimal, hexadecimal and custom base.",
  path: "/number",
});

const emitter = useEmitter();
const display = useDisplay();

const result = reactive({
  "Binary (Base 2)": "",
  "Ternary (Base 3)": "",
  "Quaternary (Base 4)": "",
  "Octal (Base 8)": "",
  "Decimal (Base 10)": "",
  "Hexadecimal (Base 16)": "",
});
const fromValue = ref("1234567890");
const fromFormat = ref<keyof typeof result>("Decimal (Base 10)");
const custom = reactive([] as { base: number; txt: string }[]);

function calculate() {
  let base = 2;
  switch (fromFormat.value) {
    case "Binary (Base 2)":
      base = 2;
      break;
    case "Ternary (Base 3)":
      base = 3;
      break;
    case "Quaternary (Base 4)":
      base = 4;
      break;
    case "Octal (Base 8)":
      base = 8;
      break;
    case "Decimal (Base 10)":
      base = 10;
      break;
    case "Hexadecimal (Base 16)":
      base = 16;
      break;
  }

  let input = 0;
  try {
    input = parseInt(fromValue.value, base);
  } catch (e) {
    result["Binary (Base 2)"] = `${e}`;
    result["Ternary (Base 3)"] = `${e}`;
    result["Quaternary (Base 4)"] = `${e}`;
    result["Octal (Base 8)"] = `${e}`;
    result["Decimal (Base 10)"] = `${e}`;
    result["Hexadecimal (Base 16)"] = `${e}`;
    custom.map((r) => (r.txt = `${e}`));
    return;
  }

  result["Binary (Base 2)"] = input.toString(2);
  result["Ternary (Base 3)"] = input.toString(3);
  result["Quaternary (Base 4)"] = input.toString(4);
  result["Octal (Base 8)"] = input.toString(8);
  result["Decimal (Base 10)"] = input.toString(10);
  result["Hexadecimal (Base 16)"] = input.toString(16);
  custom.map((r) => {
    try {
      r.txt = input.toString(r.base);
    } catch (e) {
      r.txt = `${e}`;
    }
  });
}

onMounted(() => {
  calculate();
});

watch(fromFormat, calculate);
</script>
