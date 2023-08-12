<template>
  <div>
    <v-card height="80vh" class="d-flex flex-column">
      <v-card-text class="flex-grow-1 d-flex flex-column">
        <div
          class="d-flex align-center"
          @click.stop
          @input.stop
          @mousedown.stop
        >
          <v-text-field
            label="Min (Inclusive)"
            v-model="numberFrom"
            variant="outlined"
            hide-details
            density="compact"
            @input="getNumber"
            type="number"
            @keydown.enter="getNumber"
          />
          <v-text-field
            class="ml-2"
            label="Max (Inclusive)"
            v-model="numberTo"
            variant="outlined"
            hide-details
            density="compact"
            @input="getNumber"
            type="number"
            @keydown.enter="getNumber"
          />
        </div>
        <v-card
          @click="getNumber"
          class="d-flex justify-center align-center flex-grow-1 mt-3"
        >
          <span style="font-size: 150px">
            {{ number }}
          </span>
        </v-card>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup lang="ts">
const numberFrom = ref(1);
const numberTo = ref(10);
const number = ref(0);

function getNumber() {
  numberFrom.value = Math.ceil(numberFrom.value);
  numberTo.value = Math.floor(numberTo.value);
  number.value = Math.floor(
    Math.random() * (numberTo.value - numberFrom.value + 1) + numberFrom.value
  );
}

onMounted(getNumber);
</script>
