<template>
  <div>
    <!-- connection management -->
    <v-card :title="device == null ? 'Connection' : device.name">
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

        <div class="d-flex align-center" v-for="(s, i) in optionalServices">
          <v-text-field
            v-model="s.uuid"
            variant="outlined"
            density="compact"
            hide-details
            label="Service UUID"
            :disabled="device != null"
            class="my-1"
          ></v-text-field>
          <v-tooltip text="Remove" location="top">
            <template v-slot:activator="{ props }">
              <v-btn
                v-bind="props"
                variant="plain"
                icon="mdi-close"
                @click="optionalServices.splice(i, 1)"
              >
              </v-btn>
            </template>
          </v-tooltip>
        </div>

        <v-btn
          :disabled="device != null"
          @click="optionalServices.push({ uuid: '' })"
          block
          prepend-icon="mdi-plus"
          text="Add Service"
          class="my-3"
        >
        </v-btn>

        <v-btn
          @click="device == null ? refreshDevices() : disconnect()"
          block
          :prepend-icon="device == null ? 'mdi-bluetooth' : 'mdi-bluetooth-off'"
          :loading="refreshingDevices"
          :text="device == null ? 'Connect to Device' : 'Disconnect'"
        >
        </v-btn>
      </v-card-text>
    </v-card>

    <v-card
      v-for="svc in services"
      :key="svc.service.uuid"
      :title="svc.service.uuid"
      class="my-2"
    >
      <v-card-text>
        <v-expansion-panels>
          <v-expansion-panel
            v-for="c in svc.characteristics"
            :key="c.characteristic.uuid"
            :title="c.characteristic.uuid"
          >
          </v-expansion-panel>
        </v-expansion-panels>
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
const optionalServices = ref([] as { uuid: string }[]);
const server = ref<null | BluetoothRemoteGATTServer>(null);
const services = ref(
  [] as {
    service: BluetoothRemoteGATTService;
    characteristics: {
      characteristic: BluetoothRemoteGATTCharacteristic;
      descriptors: BluetoothRemoteGATTDescriptor[];
    }[];
  }[]
);

async function refreshDevices() {
  refreshingDevices.value = true;
  device.value = null;
  server.value = null;
  services.value = [];
  try {
    device.value = await navigator.bluetooth.requestDevice(
      acceptAll.value || filterDeviceNamePrefix.value == ""
        ? {
            acceptAllDevices: true,
            optionalServices: optionalServices.value
              .filter((s) => s.uuid.length)
              .map((s) => s.uuid),
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
            optionalServices: optionalServices.value
              .filter((s) => s.uuid.length)
              .map((s) => s.uuid),
          }
    );

    emitter.emit("toast", "Connecting GATT server...");
    server.value = (await device.value.gatt?.connect()) ?? null;
    if (server.value == null) {
      emitter.emit("toast", "No GATT server.");
    } else {
      emitter.emit("toast", "Getting primary services...");
      services.value = (await server.value.getPrimaryServices()).map(
        (service) => ({
          service,
          characteristics: [],
        })
      );
      for (const svc of services.value) {
        emitter.emit("toast", `Getting characteristics of ${svc.service.uuid}`);
        svc.characteristics = (await svc.service.getCharacteristics()).map(
          (characteristic) => ({
            characteristic,
            descriptors: [],
          })
        );
        for (const char of svc.characteristics) {
          emitter.emit(
            "toast",
            `Getting descriptors of ${char.characteristic.uuid}`
          );
          char.descriptors = await char.characteristic.getDescriptors();
        }
      }
    }
  } catch (e) {
    console.log(e);
    emitter.emit("toast", "Error, see console for details.");
  }
  refreshingDevices.value = false;
}

function disconnect() {
  if (device.value) {
    device.value.gatt?.disconnect();
    device.value = null;
    server.value = null;
    services.value = [];
  }
}
</script>
