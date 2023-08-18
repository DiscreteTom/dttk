<template>
  <div class="mx-3">
    <!-- audio input -->
    <div class="d-flex align-center mb-3">
      <v-btn-toggle
        mandatory
        v-model="enableAudio"
        :disabled="recording"
        @change="updatePreview('audio')"
      >
        <v-btn
          :value="true"
          :disabled="enableAudio"
          prepend-icon="mdi-microphone"
        >
          Enable Audio
        </v-btn>
        <v-btn
          :value="false"
          :disabled="!enableAudio"
          prepend-icon="mdi-microphone-off"
        >
          Disable Audio
        </v-btn>
      </v-btn-toggle>
      <v-select
        label="Captured Audio"
        :items="audioDeviceNames"
        v-model="audioDeviceName"
        variant="outlined"
        density="compact"
        hide-details
        :disabled="!enableAudio || recording"
        class="ml-3"
        @change="updatePreview('audio')"
      />
    </div>

    <!-- video input -->
    <div class="d-flex align-center">
      <v-switch
        label="Video"
        v-model="enableVideo"
        :disabled="recording"
        inset
        @change="updatePreview('video')"
      />
      <v-radio-group
        v-model="videoInputType"
        inline
        :disabled="!enableVideo || recording"
        class="ml-3"
        @change="updatePreview('video')"
      >
        <v-radio label="Camera" value="camera" />
        <v-radio label="Record Screen" value="screen" />
      </v-radio-group>
      <v-select
        v-if="videoInputType == 'camera'"
        label="Captured Video Device"
        :items="videoDeviceNames"
        v-model="videoDeviceName"
        variant="outlined"
        density="compact"
        hide-details
        :disabled="!enableVideo || recording"
        @change="updatePreview('video')"
      />
      <v-btn
        v-if="videoInputType == 'screen'"
        :disabled="!enableVideo || recording"
        @click="selectWindow"
      >
        SELECT WINDOW
      </v-btn>
    </div>

    <!-- record controls -->
    <div class="d-flex align-center">
      <v-btn
        color="primary"
        :disabled="recording || !ready"
        @click="startRecording"
      >
        Start Recording
      </v-btn>
      <v-btn class="ml-3" :disabled="!recording" @click="stopRecording">
        End Recording
      </v-btn>
      <v-switch
        label="Preview"
        v-model="enablePreview"
        inset
        class="ml-3"
        @change="updatePreview('all')"
        :disabled="!ready"
      />
      <v-switch label="Mute Preview" v-model="mutePreview" inset class="ml-3" />
    </div>

    <video
      v-show="enablePreview"
      autoplay
      ref="preview"
      :muted="mutePreview"
      style="width: 100%"
    />
  </div>
</template>

<script setup lang="ts">
const emitter = useEmitter();

const ready = ref(true);
const enableAudio = ref(false);
const enableVideo = ref(true);
const enablePreview = ref(true);
const videoInputType = ref<"camera" | "screen">("screen");
const devices = ref<MediaDeviceInfo[]>([]);
const audioDeviceName = ref("");
const videoDeviceName = ref("");
const recording = ref(false);
const mutePreview = ref(true);
const audioStream = ref<MediaStream | null>(null);
const cameraStream = ref<MediaStream | null>(null);
const screenStream = ref<MediaStream | null>(null);
const resultStream = ref<MediaStream | null>(null);
const recorder = ref<MediaRecorder | null>(null);
const chunks = ref<Blob[]>([]);
const preview = ref<HTMLVideoElement | null>(null);

async function selectWindow() {
  screenStream.value?.getTracks().map((t) => t.stop()); // stop existing stream
  cameraStream.value?.getTracks().map((t) => t.stop()); // stop existing stream
  cameraStream.value = null;
  try {
    screenStream.value = await navigator.mediaDevices.getDisplayMedia();
  } catch (e) {
    console.log(e);
    screenStream.value = null;
  }
  updatePreview("video");
}

async function updatePreview(updated: "video" | "audio" | "all") {
  if (!enablePreview) {
    preview.value!.srcObject = null;
    return;
  }

  await getResultStream(updated);
  preview.value!.srcObject = resultStream.value;
}

async function startRecording() {
  if (resultStream.value == null) {
    emitter.emit("toast", "No stream to record");
    return;
  }

  recording.value = true;
  chunks.value = [];
  recorder.value = new MediaRecorder(resultStream.value, {
    mimeType: "video/webm;codecs=vp9",
  });
  recorder.value.ondataavailable = (e) => {
    chunks.value.push(e.data);
  };
  recorder.value.onstop = () => {
    var a = document.createElement("a");
    a.download = "capture.mp4";
    a.href = URL.createObjectURL(new Blob(chunks.value));
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

async function getResultStream(updated: "video" | "audio" | "all") {
  await refreshDeviceList();

  if (["audio", "all"].includes(updated)) {
    audioStream.value?.getTracks().map((t) => t.stop()); // stop existing stream
    if (enableAudio) {
      audioStream.value = await navigator.mediaDevices.getUserMedia({
        audio: {
          deviceId: {
            exact: devices.value.filter(
              (d) => d.label == audioDeviceName.value
            )[0].deviceId,
          },
        },
      });
    } else {
      audioStream.value = null;
    }
  }

  if (["video", "all"].includes(updated)) {
    if (enableVideo) {
      if (videoInputType.value == "camera") {
        cameraStream.value?.getTracks().map((t) => t.stop()); // stop existing stream
        screenStream.value?.getTracks().map((t) => t.stop()); // stop existing stream
        screenStream.value = null;
        cameraStream.value = await navigator.mediaDevices.getUserMedia({
          video: {
            deviceId: {
              exact: devices.value.filter(
                (d) => d.label == videoDeviceName.value
              )[0].deviceId,
            },
          },
        });
      } else {
        // screen stream
        cameraStream.value?.getTracks().map((t) => t.stop()); // stop existing stream
        cameraStream.value = null;
      }
    } else {
      cameraStream.value?.getTracks().map((t) => t.stop()); // stop existing stream
      screenStream.value?.getTracks().map((t) => t.stop()); // stop existing stream
      cameraStream.value = null;
      screenStream.value = null;
    }
  }

  let stream = new MediaStream();
  audioStream.value?.getTracks().map((t) => stream.addTrack(t));
  cameraStream.value?.getTracks().map((t) => stream.addTrack(t));
  screenStream.value?.getTracks().map((t) => stream.addTrack(t));

  resultStream.value = stream.getTracks().length == 0 ? null : stream;
}

async function refreshDeviceList() {
  if (
    enableAudio.value ||
    (enableVideo.value && videoInputType.value == "camera")
  ) {
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
            video: enableVideo.value && videoInputType.value == "camera",
          })
        )
          .getTracks()
          .map((t) => t.stop()); // stop devices

        // enumerate again
        _devices = await navigator.mediaDevices.enumerateDevices();
      } catch {
        emitter.emit("toast", "Failed to get media devices.");
        enableAudio.value = false;
        videoInputType.value = "screen";
        ready.value = true;
        return;
      }
    }

    devices.value = _devices;
    audioDeviceName.value ||= audioDeviceNames.value[0] || "";
    videoDeviceName.value ||= videoDeviceNames.value[0] || "";
    ready.value = true;
  }
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
