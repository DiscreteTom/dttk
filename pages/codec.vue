<template>
  <div>
    <!-- form -->
    <div class="mx-2">
      <div class="d-flex mb-3">
        <v-row no-gutters>
          <v-col :cols="display.smAndUp.value ? 4 : 12">
            <v-select
              label="From"
              :items="fromFormats"
              variant="outlined"
              density="compact"
              hide-details
              v-model="fromFormat"
              :class="display.smAndUp.value ? 'mr-3' : 'mb-3'"
            />
          </v-col>
          <v-col :cols="display.smAndUp.value ? 8 : 12">
            <v-text-field
              label="Value"
              v-model="fromValue"
              variant="outlined"
              density="compact"
              clearable
              hide-details
              :class="display.smAndUp.value ? 'mr-3' : ''"
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
        <v-card-title class="d-flex align-center">
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
          {{ value || " " }}
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import md5 from "js-md5";
import { Base64 } from "js-base64";
import pako from "pako";
import { useDisplay } from "vuetify";
import { Buffer } from "buffer/";

useDttkMeta({
  title: "Text Codec",
  description:
    "Free online text codec tool. Encode or decode text with various formats like UTF-8, MD5, URL Encode, Base64, Gzip, Deflate, etc",
  path: "/codec",
});

const display = useDisplay();
const emitter = useEmitter();

const result = reactive({
  "UTF-8": "",
  MD5: "",
  "URL Encode": "",
  Base64: "",
  "Gzip + Base64": "",
  "Deflate + Base64": "",
  "Deflate Raw + Base64": "",
});
const fromValue = ref("DTTK");
const constFromFormats = [
  "UTF-8",
  "URL Encode",
  "Base64",
  "Gzip + Base64",
  "Deflate + Base64",
  "Deflate Raw + Base64",
] as const;
const fromFormats = ref(constFromFormats);
const fromFormat = ref<(typeof constFromFormats)[number]>("UTF-8");

function handleErr(f: (s: string) => string, text: string) {
  try {
    return f(text);
  } catch (e) {
    return `${e}`;
  }
}

function calculate() {
  let text = fromValue.value;
  try {
    switch (fromFormat.value) {
      case "URL Encode":
        text = decodeURIComponent(text);
        break;
      case "Base64":
        text = Base64.decode(text);
        break;
      case "Gzip + Base64":
        text = pako.ungzip(Buffer.from(text, "base64")).toString();
        break;
      case "Deflate + Base64":
        text = pako.inflate(Buffer.from(text, "base64")).toString();
        break;
      case "Deflate Raw + Base64":
        text = pako.inflateRaw(Buffer.from(text, "base64")).toString();
        break;
    }
  } catch (e) {
    for (let key in result) {
      result[key as keyof typeof result] = `${e}`;
    }
    return;
  }

  result["UTF-8"] = text;
  result.MD5 = handleErr(md5, text);
  result["URL Encode"] = handleErr(encodeURIComponent, text);
  result.Base64 = handleErr(Base64.encode, text);
  result["Gzip + Base64"] = handleErr(
    (text) => Buffer.from(pako.gzip(text)).toString("base64"),
    text
  );
  result["Deflate + Base64"] = handleErr(
    (text) => Buffer.from(pako.deflate(text)).toString("base64"),
    text
  );
  result["Deflate Raw + Base64"] = handleErr(
    (text) => Buffer.from(pako.deflateRaw(text)).toString("base64"),
    text
  );
}

onMounted(calculate);
watch(fromFormat, calculate);
</script>
