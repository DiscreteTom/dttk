<template>
  <div>
    <v-card
      :title="device == null ? 'Connection' : `Connected: ${device.name}`"
    >
      <v-card-text>
        <!-- toggle filter -->
        <v-btn-toggle
          v-if="device == null"
          mandatory
          v-model="acceptAll"
          class="mb-3"
          style="width: 100%"
        >
          <v-btn
            :value="true"
            :disabled="acceptAll"
            style="flex-grow: 1"
            prepend-icon="mdi-check-all"
          >
            Accept All
          </v-btn>
          <v-btn
            :value="false"
            :disabled="!acceptAll"
            style="flex-grow: 1"
            prepend-icon="mdi-filter-outline"
          >
            Filter
          </v-btn>
        </v-btn-toggle>

        <v-text-field
          v-model="filterDeviceNamePrefix"
          v-if="!acceptAll"
          variant="outlined"
          density="compact"
          hide-details
          label="Device Name Prefix"
        ></v-text-field>

        <v-btn
          @click="device == null ? refreshDevices() : disconnect()"
          block
          :prepend-icon="device == null ? 'mdi-refresh' : 'mdi-bluetooth-off'"
          :loading="refreshingDevices"
          :text="device == null ? 'Refresh Devices' : 'Disconnect'"
        >
        </v-btn>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup lang="ts">
const emitter = useEmitter();

useDttkMeta({
  title: "BLE Debugger",
  description: "Debug Bluetooth Low Energy devices & services.",
  path: "/ble",
});

const device = ref<null | BluetoothDevice>(null);
const acceptAll = ref(true);
const refreshingDevices = ref(false);
const filterDeviceNamePrefix = ref("");

async function refreshDevices() {
  refreshingDevices.value = true;
  device.value = null;
  try {
    device.value = await navigator.bluetooth.requestDevice(
      acceptAll.value || filterDeviceNamePrefix.value == ""
        ? {
            acceptAllDevices: true,
            optionalServices: [],
          }
        : {
            filters: [
              {
                namePrefix:
                  filterDeviceNamePrefix.value == ""
                    ? undefined
                    : filterDeviceNamePrefix.value,
              },
            ],
            optionalServices: [],
          }
    );
  } catch (e) {
    console.log(e);
  }
  refreshingDevices.value = false;
}

function disconnect() {
  if (device.value) {
    device.value.gatt?.disconnect();
    device.value = null;
  }
}
</script>
