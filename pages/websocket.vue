<template>
  <div>
    <!-- websocket params -->
    <div class="d-flex flex-wrap">
      <v-text-field
        label="Server URL"
        v-model="url"
        variant="outlined"
        density="compact"
        clearable
        hide-details
        placeholder="ws://localhost:8080"
        :disabled="connecting || ws != null"
        :class="display.smAndUp.value ? 'mr-3' : 'mb-3'"
        :style="display.smAndUp.value ? '' : 'width:100%'"
      />
      <v-text-field
        label="Subprotocols (optional, comma separated)"
        v-model="subprotocols"
        variant="outlined"
        density="compact"
        clearable
        hide-details
        placeholder="ship, done"
        :disabled="connecting || ws != null"
      />
    </div>

    <v-btn
      @click="ws == null ? connect() : ws.close()"
      :disabled="connecting"
      block
      class="my-2"
      :prepend-icon="ws == null ? 'mdi-link-variant' : 'mdi-link-variant-off'"
      :text="ws == null ? 'Connect' : 'Disconnect'"
      :loading="connecting"
    >
    </v-btn>

    <!-- input -->
    <v-textarea
      label=""
      rows="1"
      v-model="input"
      auto-grow
      variant="outlined"
      density="compact"
      clearable
      hide-details
      :disabled="ws == null"
      @keyup.ctrl.enter="sendMessage"
      placeholder="Type message here"
    >
      <template v-slot:append-inner>
        <v-tooltip text="Send (Ctrl+Enter)" location="top">
          <template v-slot:activator="{ props }">
            <v-btn
              v-bind="props"
              icon="mdi-send"
              variant="plain"
              @click="sendMessage"
            >
            </v-btn>
          </template>
        </v-tooltip>
      </template>
    </v-textarea>

    <div class="d-flex flex-wrap">
      <v-btn
        @click="showFormattedJson = !showFormattedJson"
        :class="display.smAndUp.value ? 'mr-2 my-2 flex-grow-1' : 'mt-2'"
        prepend-icon="mdi-code-json"
        :text="
          showFormattedJson ? 'Show Unformatted Message' : 'Show Formatted JSON'
        "
        :style="display.smAndUp.value ? '' : 'width:100%'"
      >
      </v-btn>
      <v-btn
        @click="messages.length = 0"
        class="my-2 flex-grow-1"
        prepend-icon="mdi-delete-outline"
        text="Clear History"
        :style="clearHistoryBtnColor && `color:${clearHistoryBtnColor}`"
        @mouseover="clearHistoryBtnColor = 'red'"
        @mouseleave="clearHistoryBtnColor = undefined"
      >
      </v-btn>
    </div>

    <!-- messages -->
    <div v-for="m in messages" :key="m.time.getTime()" class="my-2 d-flex">
      <v-tooltip
        :text="m.from == 'server' ? 'From Server' : 'From System'"
        location="top"
        v-if="m.from == 'server' || m.from == 'system'"
      >
        <template v-slot:activator="{ props }">
          <v-btn
            v-bind="props"
            variant="plain"
            :icon="
              m.from == 'server'
                ? 'mdi-arrow-bottom-right-thick'
                : 'mdi-robot-outline'
            "
          >
          </v-btn>
        </template>
      </v-tooltip>

      <v-card
        class="flex-grow-1"
        v-clipboard:copy="m.content"
        v-clipboard:success="() => emitter.emit('toast', 'Copied')"
        @click=""
      >
        <div class="d-flex flex-wrap">
          <v-card-text
            :style="m.type == 'error' ? 'color:red' : undefined"
            style="
              word-break: break-all;
              white-space: pre;
              overflow: auto;
              font-family: monospace;
            "
          >
            {{ showFormattedJson ? m.json ?? m.content : m.content }}
          </v-card-text>
          <div class="d-flex flex-grow-1 align-end">
            <div class="flex-grow-1"></div>
            <v-card-subtitle>
              {{ m.time.toLocaleTimeString() }}
            </v-card-subtitle>
          </div>
        </div>
      </v-card>

      <v-tooltip text="From Local" location="top" v-if="m.from == 'client'">
        <template v-slot:activator="{ props }">
          <v-btn v-bind="props" variant="plain" icon="mdi-arrow-top-left-thick">
          </v-btn>
        </template>
      </v-tooltip>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDisplay } from "vuetify";

const emitter = useEmitter();
const display = useDisplay();

const url = ref("ws://localhost:8080");
const subprotocols = ref("");
const showFormattedJson = ref(false);
const connecting = ref(false);
const clearHistoryBtnColor = ref<undefined | string>(undefined);
const ws = ref<WebSocket | null>(null);
const input = ref("");
const messages = ref<
  {
    time: Date;
    from: "system" | "server" | "client";
    type: "text" | "error";
    content: string;
    json?: string;
  }[]
>([]);

function connect() {
  connecting.value = true;
  if (ws.value != null) {
    ws.value.close();
  }
  ws.value = new WebSocket(
    url.value,
    subprotocols.value
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s != "")
  );
  ws.value.onopen = () => {
    connecting.value = false;
    messages.value.unshift({
      time: new Date(),
      from: "system",
      type: "text",
      content: "Connected",
    });
  };
  ws.value.onclose = () => {
    ws.value = null;
    connecting.value = false;
    messages.value.unshift({
      time: new Date(),
      from: "system",
      type: "text",
      content: "Disconnected",
    });
  };
  ws.value.onmessage = (e) => {
    messages.value.unshift({
      time: new Date(),
      from: "server",
      type: "text",
      content: e.data,
      json: tryFormatJsonString(e.data),
    });
  };
  ws.value.onerror = (e) => {
    ws.value = null;
    connecting.value = false;
    messages.value.unshift({
      time: new Date(),
      from: "system",
      type: "error",
      content: e.type,
    });
  };
}

function sendMessage() {
  if (ws.value == null) {
    emitter.emit("toast", "Not connected");
    return;
  }
  ws.value.send(input.value);
  messages.value.unshift({
    time: new Date(),
    from: "client",
    type: "text",
    content: input.value,
    json: tryFormatJsonString(input.value),
  });
  input.value = "";
}

function tryFormatJsonString(s: string) {
  try {
    return JSON.stringify(JSON.parse(s), null, 2);
  } catch {
    return undefined;
  }
}
</script>
