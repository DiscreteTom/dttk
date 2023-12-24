<template>
  <div>
    <!-- dependencies -->
    <v-expansion-panels class="my-3">
      <v-expansion-panel>
        <v-expansion-panel-title ripple> Dependencies </v-expansion-panel-title>
        <v-expansion-panel-text>
          <div class="d-flex align-center" v-for="(dep, index) in dependencies">
            <v-text-field
              :key="index"
              variant="solo"
              hide-details
              label="CDN URL"
              placeholder="https://cdn.jsdelivr.net/npm/package@version/file"
              class="flex-grow-1"
              v-model="dependencies[index]"
            ></v-text-field>
            <v-tooltip text="Delete" location="top">
              <template v-slot:activator="{ props }">
                <v-btn
                  v-bind="props"
                  variant="plain"
                  icon="mdi-close"
                  @click="dependencies.splice(index, 1)"
                >
                </v-btn>
              </template>
            </v-tooltip>
          </div>
          <v-btn
            @click="dependencies.push('')"
            prepend-icon="mdi-plus"
            text="Add"
            class="my-3"
            block
          ></v-btn>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>

    <!-- code cells -->
    <v-expansion-panels multiple v-model="panels">
      <v-expansion-panel
        v-for="(cell, index) in cells"
        :key="cell.id"
        :value="cell.id"
      >
        <v-expansion-panel-title ripple class="py-2">
          <v-text-field
            variant="solo"
            @click.stop
            @keyup.prevent.stop.space
            @keydown.prevent.stop.space="cell.name += ' '"
            hide-details
            placeholder="Cell Name"
            density="compact"
            v-model="cell.name"
            style="max-width: 500px"
          ></v-text-field>
          <v-spacer></v-spacer>
          <v-checkbox
            v-model="cell.readonly"
            @click.stop
            hide-details
            density="compact"
            class="flex-grow-0 ml-3"
          >
            <template v-slot:label>
              <div @click.stop>Readonly</div>
            </template>
          </v-checkbox>
          <client-only>
            <v-tooltip text="Delete Cell" location="top">
              <template v-slot:activator="{ props }">
                <v-btn
                  v-bind="props"
                  variant="plain"
                  icon="mdi-close"
                  @click.stop="cells.splice(index, 1)"
                  class="ml-3"
                  style="height: 40px"
                >
                </v-btn>
              </template>
            </v-tooltip>
          </client-only>
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <div style="height: 200px">
            <client-only>
              <vue-monaco-editor
                v-model:value="cell.code"
                theme="vs-dark"
                :options="{ ...MONACO_EDITOR_OPTIONS, readOnly: cell.readonly }"
                language="javascript"
                class="my-3"
              />
            </client-only>
          </div>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>

    <!-- action buttons -->
    <div class="my-3">
      <v-btn @click="appendCell" prepend-icon="mdi-plus"> Add Cell </v-btn>
      <v-btn
        prepend-icon="mdi-play"
        class="mx-3"
        @click="execute"
        :loading="executing"
      >
        Execute
      </v-btn>
      <v-btn
        prepend-icon="mdi-share"
        @click="
          toClipboard(generateSharingUrl());
          emitter.emit('toast', 'Copied');
        "
      >
        Copy Sharing URL
      </v-btn>
    </div>

    <!-- output -->
    <v-card
      :title="`Output (${time}ms)`"
      class="my-3"
      v-show="output.length !== 0"
    >
      <v-card-text>
        <pre>{{ output }}</pre>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import type { editor } from "monaco-editor"; // use type only import to prevent SSR issue
import { VueMonacoEditor } from "@guolao/vue-monaco-editor";
import JSONCrush from "jsoncrush";
import { toClipboard } from "@soerenmartius/vue3-clipboard";

useDttkMeta({
  title: "JavaScript Playground",
  description: "A playground for JavaScript",
  path: "/js-playground",
});

const emitter = useEmitter();

const MONACO_EDITOR_OPTIONS: editor.IStandaloneEditorConstructionOptions = {
  automaticLayout: true,
  formatOnType: true,
  formatOnPaste: true,
};

const dependencies = ref([] as string[]);
const dependencyCache = new Map<string, string>(); // URL => content

const emptyCell = Object.freeze({
  name: "",
  code: "",
  readonly: false,
});
// by default there is one cell with id 0
const cells = reactive([{ ...emptyCell, id: 0 }]);
const panels = ref([0]);
function appendCell() {
  const id = Date.now();
  cells.push({ ...emptyCell, id });
  panels.value.push(id);
}

const output = ref("");
const executing = ref(false);
const time = ref(0);

async function execute() {
  // clear state
  executing.value = true;
  output.value = "";
  time.value = 0;

  // load dependencies
  const urls = dependencies.value.filter((url) => url.length !== 0);
  const contents = [] as string[];
  try {
    contents.push(
      ...(await Promise.all(
        urls.map(async (url) => {
          if (dependencyCache.has(url)) {
            return dependencyCache.get(url)!;
          }
          output.value += `Loading ${url}...\n`;
          const res = await fetch(url);
          const content = await res.text();
          dependencyCache.set(url, content);
          return content;
        })
      ))
    );
  } catch (e) {
    output.value += `${e}`;
    executing.value = false;
    return;
  }

  output.value = "";
  const code = contents.concat(cells.map((cell) => cell.code)).join("\n");

  // ref: https://stackoverflow.com/questions/47945024/dynamically-create-async-function
  // ref: https://krasimirtsonev.com/blog/article/build-your-own-interactive-javascript-playground
  const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;
  const f = new AsyncFunction(code) as () => Promise<void>;

  await withMockLog(f);
  // update state
  executing.value = false;
}

async function withMockLog(f: () => Promise<void>) {
  const log = console.log;
  console.log = (...args: any[]) => {
    output.value += args.join(" ") + "\n";
  };
  const start = performance.now();
  try {
    await f();
  } catch (e) {
    output.value += `${e}`;
  }
  time.value = performance.now() - start;
  console.log = log;
}

// share & restore
function generateSharingUrl() {
  if (!process.client) return ""; // prevent SSR issue

  const url = new URL(window.location.href);
  const res = {
    // clone value, disable responsive
    dependencies: [...dependencies.value],
    cells: cells.map((cell) => ({ ...cell })),
    panels: [...panels.value],
  };
  const crushed = encodeURIComponent(JSONCrush.crush(JSON.stringify(res)));
  url.searchParams.set("crushed", crushed);
  return url.href;
}
onMounted(() => {
  const url = new URL(window.location.href);
  const crushed = url.searchParams.get("crushed");
  if (crushed) {
    try {
      const res = JSON.parse(JSONCrush.uncrush(decodeURIComponent(crushed)));
      dependencies.value = res.dependencies;
      cells.splice(0, cells.length, ...res.cells);
      panels.value = res.panels;
    } catch (e) {
      console.log(e);
    }
  }
});
</script>
