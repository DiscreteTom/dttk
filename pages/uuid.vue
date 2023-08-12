<template>
  <div>
    <!-- nil -->
    <v-card class="mx-3 my-3">
      <v-card-title> NIL </v-card-title>
      <v-card-subtitle> All zeros </v-card-subtitle>
      <v-card-text class="d-flex align-center">
        <v-text-field
          v-model="nil"
          disabled
          variant="outlined"
          hide-details
          density="compact"
          class="mr-3"
          label="UUID NIL"
        />
        <v-tooltip text="Copy" location="top">
          <template v-slot:activator="{ props }">
            <v-btn
              v-bind="props"
              variant="plain"
              icon="mdi-content-copy"
              v-clipboard:copy="nil"
              v-clipboard:success="() => emitter.emit('toast', 'Copied')"
            >
            </v-btn>
          </template>
        </v-tooltip>
      </v-card-text>
    </v-card>

    <!-- v1 -->
    <v-card class="mx-3 my-3">
      <v-card-title> UUID v1 </v-card-title>
      <v-card-subtitle> Timestamp </v-card-subtitle>
      <v-card-text class="d-flex align-center">
        <v-text-field
          v-model="v1txt"
          disabled
          variant="outlined"
          hide-details
          density="compact"
          class="mr-3"
          label="UUID v1"
        />
        <v-tooltip text="Refresh" location="top">
          <template v-slot:activator="{ props }">
            <v-btn
              v-bind="props"
              icon="mdi-refresh"
              variant="plain"
              @click="getV1"
            >
            </v-btn>
          </template>
        </v-tooltip>
        <v-tooltip text="Copy" location="top">
          <template v-slot:activator="{ props }">
            <v-btn
              v-bind="props"
              variant="plain"
              icon="mdi-content-copy"
              v-clipboard:copy="v1txt"
              v-clipboard:success="() => emitter.emit('toast', 'Copied')"
            >
            </v-btn>
          </template>
        </v-tooltip>
      </v-card-text>
    </v-card>

    <!-- v3 -->
    <v-card class="mx-3 my-3">
      <v-card-title> UUID v3 </v-card-title>
      <v-card-subtitle> MD5 </v-card-subtitle>
      <v-card-text>
        <v-text-field
          v-model="v3namespace"
          variant="outlined"
          clearable
          hide-details
          density="compact"
          class="mb-3"
          label="Namespace"
          @input="getV3"
          :rules="[(value) => validate(value)]"
        />
        <v-text-field
          v-model="v3name"
          variant="outlined"
          clearable
          hide-details
          density="compact"
          class="mb-3"
          label="Name"
          @input="getV3"
        />
        <div class="d-flex align-center">
          <v-text-field
            v-model="v3txt"
            disabled
            variant="outlined"
            hide-details
            density="compact"
            label="UUID v3"
            class="mr-3"
          />
          <v-tooltip text="Copy" location="top">
            <template v-slot:activator="{ props }">
              <v-btn
                v-bind="props"
                variant="plain"
                icon="mdi-content-copy"
                v-clipboard:copy="v3txt"
                v-clipboard:success="() => emitter.emit('toast', 'Copied')"
              >
              </v-btn>
            </template>
          </v-tooltip>
        </div>
      </v-card-text>
    </v-card>

    <!-- v4 -->
    <v-card class="mx-3 my-3">
      <v-card-title> UUID v4 </v-card-title>
      <v-card-subtitle> Random </v-card-subtitle>
      <v-card-text class="d-flex align-center">
        <v-text-field
          v-model="v4txt"
          disabled
          variant="outlined"
          hide-details
          density="compact"
          class="mr-3"
          label="UUID v4"
        />
        <v-tooltip text="Refresh" location="top">
          <template v-slot:activator="{ props }">
            <v-btn
              v-bind="props"
              icon="mdi-refresh"
              variant="plain"
              @click="getV4"
            >
            </v-btn>
          </template>
        </v-tooltip>
        <v-tooltip text="Copy" location="top">
          <template v-slot:activator="{ props }">
            <v-btn
              v-bind="props"
              variant="plain"
              icon="mdi-content-copy"
              v-clipboard:copy="v4txt"
              v-clipboard:success="() => emitter.emit('toast', 'Copied')"
            >
            </v-btn>
          </template>
        </v-tooltip>
      </v-card-text>
    </v-card>

    <!-- v5 -->
    <v-card class="mx-3 my-3">
      <v-card-title> UUID v5 </v-card-title>
      <v-card-subtitle> SHA1 </v-card-subtitle>
      <v-card-text>
        <v-text-field
          v-model="v5namespace"
          variant="outlined"
          clearable
          hide-details
          density="compact"
          class="mb-3"
          label="Namespace"
          @input="getV5"
          :rules="[(value) => validate(value)]"
        />
        <v-text-field
          v-model="v5name"
          variant="outlined"
          clearable
          hide-details
          density="compact"
          class="mb-3"
          label="Name"
          @input="getV5"
        />
        <div class="d-flex align-center">
          <v-text-field
            v-model="v5txt"
            disabled
            variant="outlined"
            hide-details
            density="compact"
            label="UUID v5"
            class="mr-3"
          />
          <v-tooltip text="Copy" location="top">
            <template v-slot:activator="{ props }">
              <v-btn
                v-bind="props"
                variant="plain"
                icon="mdi-content-copy"
                v-clipboard:copy="v5txt"
                v-clipboard:success="() => emitter.emit('toast', 'Copied')"
              >
              </v-btn>
            </template>
          </v-tooltip>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import * as uuid from "uuid";

useDttkMeta({
  title: "UUID Generator",
  description: "Free online UUID generator. Support UUID v1, v3, v4, v5.",
  path: "/uuid",
});

const emitter = useEmitter();

const nil = ref(uuid.NIL);
const v1txt = ref("");
const v3name = ref("");
const v3namespace = ref(uuid.NIL);
const v3txt = ref("");
const v4txt = ref("");
const v5name = ref("");
const v5namespace = ref(uuid.NIL);
const v5txt = ref("");
const validate = uuid.validate;

function getV1() {
  v1txt.value = uuid.v1();
}

function getV3() {
  try {
    v3txt.value = uuid.v3(v3name.value, v3namespace.value);
  } catch (e) {
    v3txt.value = `${e}`;
  }
}

function getV4() {
  v4txt.value = uuid.v4();
}

function getV5() {
  try {
    v5txt.value = uuid.v5(v5name.value, v5namespace.value);
  } catch (e) {
    v5txt.value = `${e}`;
  }
}

onMounted(() => {
  getV1();
  getV3();
  getV4();
  getV5();
});
</script>
