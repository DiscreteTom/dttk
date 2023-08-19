<template>
  <div class="mx-3">
    <v-alert
      type="info"
      closable
      text="The recording is handled by the local browser and will not be uploaded to any server."
      class="mb-3"
      density="compact"
      variant="tonal"
    ></v-alert>

    <!-- audio input -->
    <div class="d-flex align-center mb-3">
      <v-btn-toggle
        mandatory
        v-model="enableAudio"
        :disabled="recording"
        @update:model-value="updatePreview('audio')"
      >
        <v-btn
          :value="false"
          :disabled="!enableAudio"
          prepend-icon="mdi-microphone-off"
        >
          No Mic
        </v-btn>
        <v-btn
          :value="true"
          :disabled="enableAudio"
          prepend-icon="mdi-microphone"
        >
          Enable Mic
        </v-btn>
      </v-btn-toggle>
      <v-select
        label="Microphone Device"
        :items="audioDeviceNames"
        v-model="audioDeviceName"
        variant="outlined"
        density="compact"
        hide-details
        :disabled="!enableAudio || recording"
        class="ml-3"
        @update:model-value="updatePreview('audio')"
      />
    </div>

    <!-- video input -->
    <div class="d-flex align-center">
      <v-btn-toggle
        divided
        mandatory
        v-model="videoInputType"
        :disabled="recording"
        @update:model-value="updatePreview('video')"
        class="mr-3"
      >
        <v-btn
          :value="'none'"
          :disabled="videoInputType == 'none'"
          prepend-icon="mdi-video-off"
        >
          No Video
        </v-btn>
        <v-btn
          :value="'screen'"
          :disabled="videoInputType == 'screen'"
          prepend-icon="mdi-monitor"
          @click="selectWindow"
        >
          Record Screen
        </v-btn>
        <v-btn
          :value="'camera'"
          :disabled="videoInputType == 'camera'"
          prepend-icon="mdi-camera"
        >
          Camera
        </v-btn>
      </v-btn-toggle>
      <v-select
        label="Camera Device"
        :items="videoDeviceNames"
        v-model="videoDeviceName"
        variant="outlined"
        density="compact"
        hide-details
        :disabled="recording || videoInputType != 'camera'"
        @update:model-value="updatePreview('video')"
      />
    </div>

    <!-- record controls -->
    <div class="d-flex align-center">
      <v-btn
        color="primary"
        :disabled="!ready || resultStream == null"
        @click="recording ? stopRecording() : startRecording()"
        :text="
          recording
            ? 'Stop Recording'
            : videoStream
            ? 'Start Recording (mp4)'
            : audioStream
            ? 'Start Recording (mp3)'
            : 'Start Recording'
        "
        :prepend-icon="recording ? 'mdi-stop' : 'mdi-record'"
      >
      </v-btn>
      <v-btn
        class="ml-3"
        @click="reset"
        text="Reset"
        prepend-icon="mdi-restart"
      ></v-btn>
      <v-checkbox
        label="Preview"
        v-model="enablePreview"
        class="ml-3"
        @update:model-value="updatePreview('all')"
        :disabled="!ready"
        hide-details
        style="flex-grow: 0"
      />
      <v-checkbox
        label="Mute Preview"
        v-model="mutePreview"
        class="ml-3"
        style="flex-grow: 0"
        hide-details
      />
    </div>

    <div v-show="enablePreview">
      <v-card v-show="videoStream == null" style="width: 100%">
        <v-card-text>
          No preview available. Please select a video source.
        </v-card-text>
      </v-card>
      <video
        v-show="videoStream != null"
        autoplay
        ref="preview"
        :muted="mutePreview"
        style="width: 100%"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const emitter = useEmitter();

/** If getting devices, ready is false. */
const ready = ref(true);
const enableAudio = ref(false);
const videoInputType = ref<"camera" | "screen" | "none">("none");
const enablePreview = ref(true);
const devices = ref<MediaDeviceInfo[]>([]);
const audioDeviceName = ref("");
const videoDeviceName = ref("");
const recording = ref(false);
const mutePreview = ref(true);
const audioStream = ref<MediaStream | null>(null);
const videoStream = ref<MediaStream | null>(null);
const resultStream = ref<MediaStream | null>(null);
const recorder = ref<MediaRecorder | null>(null);
const preview = ref<HTMLVideoElement | null>(null);
const chunks = [] as Blob[];

async function selectWindow() {
  // disable existing video streams
  videoStream.value?.getTracks().map((t) => t.stop()); // stop existing stream
  videoStream.value = null;
  try {
    videoStream.value = await navigator.mediaDevices.getDisplayMedia({
      audio: true,
      video: true,
    });
  } catch (e) {
    console.log(e);
    videoStream.value = null;
    videoInputType.value = "none";
  }
  updatePreview("video");
}

async function updatePreview(updated: "video" | "audio" | "all") {
  if (!enablePreview.value) {
    preview.value!.srcObject = null;
    return;
  }

  await updateResultStream(updated);
  preview.value!.srcObject = resultStream.value;
}

async function startRecording() {
  if (resultStream.value == null) {
    emitter.emit("toast", "No stream to record");
    return;
  }

  recording.value = true;
  chunks.length = 0; // clear
  recorder.value = new MediaRecorder(
    resultStream.value,
    videoStream.value == null
      ? undefined // for audio only recording
      : {
          // for video recording
          mimeType: "video/webm;codecs=vp9",
        }
  );
  recorder.value.ondataavailable = (e) => {
    chunks.push(e.data);
  };
  recorder.value.onstop = () => {
    var a = document.createElement("a");
    a.download = videoStream.value == null ? "recording.mp3" : "recording.mp4";
    a.href = URL.createObjectURL(
      new Blob(
        chunks,
        videoStream.value == null ? { type: "audio/mpeg-3" } : undefined
      )
    );
    a.click();
  };
  recorder.value.start();
  emitter.emit("toast", "Recording started");
  console.log(recorder.value.state);
}

function stopRecording() {
  recording.value = false;
  recorder.value?.stop();
  console.log(recorder.value?.state);
  recorder.value = null;
}

async function updateResultStream(updated: "video" | "audio" | "all") {
  await refreshDeviceList();

  if (["audio", "all"].includes(updated)) {
    audioStream.value?.getTracks().map((t) => t.stop()); // stop existing stream
    audioStream.value = null;
    if (enableAudio.value) {
      audioStream.value = await navigator.mediaDevices.getUserMedia({
        audio: {
          deviceId: {
            exact: devices.value.filter(
              (d) => d.label == audioDeviceName.value
            )[0].deviceId,
          },
        },
      });
    }
  }

  if (["video", "all"].includes(updated)) {
    // only screen stream can be reused
    // since the screen stream is assigned by selectWindow
    if (videoInputType.value != "screen") {
      videoStream.value?.getTracks().map((t) => t.stop()); // stop existing stream
      videoStream.value = null;
    }

    if (videoInputType.value == "camera") {
      videoStream.value = await navigator.mediaDevices.getUserMedia({
        video: {
          deviceId: {
            exact: devices.value.filter(
              (d) => d.label == videoDeviceName.value
            )[0].deviceId,
          },
        },
      });
    }
  }

  let stream = new MediaStream();
  audioStream.value?.getTracks().map((t) => stream.addTrack(t));
  videoStream.value?.getTracks().map((t) => stream.addTrack(t));

  resultStream.value = stream.getTracks().length == 0 ? null : stream;
}

async function refreshDeviceList() {
  if (!ready.value) return;
  if (!enableAudio.value && videoInputType.value != "camera") return;

  if (devices.value.length == 0 || devices.value.some((d) => d.label == ""))
    emitter.emit("toast", "Refreshing device list...");

  let _devices = await navigator.mediaDevices.enumerateDevices();
  if (_devices.some((d) => d.label == "")) {
    // need to retrieve permission
    try {
      ready.value = false;
      (
        await navigator.mediaDevices.getUserMedia({
          audio: enableAudio.value,
          video: videoInputType.value == "camera",
        })
      )
        .getTracks()
        .map((t) => t.stop()); // stop devices, just need permission

      // enumerate again
      _devices = await navigator.mediaDevices.enumerateDevices();
    } catch {
      emitter.emit("toast", "Failed to get media devices.");
      enableAudio.value = false;
      videoInputType.value = "screen"; // fallback to screen
      ready.value = true;
      return;
    }
  }

  devices.value = _devices;
  audioDeviceName.value = audioDeviceNames.value[0] || "";
  videoDeviceName.value = videoDeviceNames.value[0] || "";
  ready.value = true;
  emitter.emit("toast", "Device list refreshed");
}

function reset() {
  enableAudio.value = false;
  videoInputType.value = "none";
  enablePreview.value = true;
  mutePreview.value = true;
  videoStream.value?.getTracks().map((t) => t.stop()); // stop existing stream
  videoStream.value = null;
  audioStream.value?.getTracks().map((t) => t.stop()); // stop existing stream
  audioStream.value = null;
  resultStream.value?.getTracks().map((t) => t.stop()); // stop existing stream
  resultStream.value = null;
}

onMounted(() => {
  updatePreview("all");
});

const audioDeviceNames = computed(() =>
  devices.value.filter((d) => d.kind.startsWith("audio")).map((d) => d.label)
);

const videoDeviceNames = computed(() =>
  devices.value.filter((d) => d.kind.startsWith("video")).map((d) => d.label)
);
</script>
