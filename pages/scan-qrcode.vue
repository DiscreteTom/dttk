<template>
  <div class="mx-3">
    <div class="d-flex flex-wrap justify-center flex-wrap">
      <div class="d-flex flex-column align-center mx-3">
        <img width="300" height="300" ref="img" />
        <v-btn block @click="chooseFile" class="my-2"> Choose a File </v-btn>
      </div>

      <div class="flex-grow-1 d-flex flex-column align-center">
        <v-card
          style="width: 100%"
          density="compact"
          @click="result.length"
          v-clipboard:copy="result"
          v-clipboard:success="() => emitter.emit('toast', 'Copied')"
        >
          <v-textarea
            v-model="result"
            :label="
              'QR Code Content' +
              (result.length === 0 ? '' : ' (Click to Copy)')
            "
            variant="solo"
            counter
            no-resize
            rows="11"
            disabled
            hide-details
          />
        </v-card>
        <v-btn block style="width: 100%" @click="result = ''" class="my-2">
          Clear Result
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import QrScanner from "qr-scanner";

useDttkMeta({
  title: "QRCode Scanner",
  description: "Scan QRCode from an image",
  path: "/scan-qrcode",
});

const emitter = useEmitter();

const img = ref<HTMLImageElement | null>(null);
const result = ref("");

// scan image when image is loaded
onMounted(() => {
  img.value!.onload = () => {
    QrScanner.scanImage(img.value!.src, {
      returnDetailedScanResult: true,
    })
      .then((res) => {
        result.value = res.data;
      })
      .catch((error) => {
        result.value = error.toString();
      });
  };
});

function chooseFile() {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "image/*";
  input.onchange = () => {
    const file = input.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        img.value!.src = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  };
  input.click();
}
</script>
