<template>
  <div class="mx-3">
    <div class="d-flex flex-wrap justify-center flex-wrap">
      <div class="d-flex flex-column align-center mx-3">
        <img style="min-width: 300px" height="300" ref="img" />
        <v-btn
          block
          prepend-icon="mdi-folder-open-outline"
          @click="chooseFile"
          class="my-2"
        >
          Choose a File
        </v-btn>
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
        <v-btn
          block
          prepend-icon="mdi-trash-can-outline"
          style="width: 100%"
          @click="result = ''"
          class="my-2"
        >
          Clear Result
        </v-btn>
      </div>
    </div>

    <div class="d-flex justify-center">
      <p style="color: grey; font-style: italic; font-weight: bold">
        You can also paste image in this page. (Ctrl+V or Cmd+V)
      </p>
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

onMounted(() => {
  // ref: https://stackoverflow.com/questions/6333814/how-does-the-paste-image-from-clipboard-functionality-work-in-gmail-and-google-c
  document.onpaste = function (event: ClipboardEvent) {
    var items = event.clipboardData!.items;
    for (var index in items) {
      var item = items[index];
      if (item.kind === "file") {
        var blob = item.getAsFile();
        var reader = new FileReader();
        reader.onload = function (event) {
          img.value!.src = event.target!.result as string; // data url!
        };
        reader.readAsDataURL(blob!);
        return; // only paste 1 image
      }
    }
    // no image found
    emitter.emit("toast", "No image found in clipboard");
  };
});

onUnmounted(() => {
  document.onpaste = null;
});
</script>
