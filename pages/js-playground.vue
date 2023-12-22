<template>
  <div>
    <v-expansion-panels multiple variant="accordion" v-model="panels">
      <v-expansion-panel
        v-for="(cell, index) in cells"
        :key="cell.id"
        :value="cell.id"
      >
        <v-expansion-panel-title>
          <v-checkbox
            v-model="cell.readonly"
            @click.stop
            hide-details
            density="compact"
            class="flex-grow-0"
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
    <div class="my-3">
      <v-btn @click="appendCell" prepend-icon="mdi-plus"> Add Cell </v-btn>
      <v-btn prepend-icon="mdi-play" class="mx-3" @click="execute">
        Execute
      </v-btn>
      <v-btn prepend-icon="mdi-share">Copy Sharing URL</v-btn>
    </div>
    <v-card title="Output" class="my-3">
      <v-card-text>{{ output }}</v-card-text>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { editor } from "monaco-editor";
import { VueMonacoEditor } from "@guolao/vue-monaco-editor";

const MONACO_EDITOR_OPTIONS: editor.IStandaloneEditorConstructionOptions = {
  automaticLayout: true,
  formatOnType: true,
  formatOnPaste: true,
};

const emptyCell = Object.freeze({
  type: "code" as const,
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

function execute() {
  // ref: https://krasimirtsonev.com/blog/article/build-your-own-interactive-javascript-playground
  output.value = "";
  const code = cells.map((cell) => cell.code).join("\n");
  console.log(code);
  const f = new Function(code);

  // mock console.log
  const oldLog = console.log;
  let value = "";
  console.log = (...args: any[]) => {
    // output.value += args.join(" ") + "\n";
    value += args.join(" ") + "\n";
  };
  f();
  console.log = oldLog;

  console.log(value);
  nextTick(() => (output.value = value));
}
</script>
