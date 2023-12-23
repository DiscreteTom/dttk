<template>
  <div>
    <div ref="videoContainer"></div>
  </div>
</template>

<script setup lang="ts">
import videojs from "video.js";
import "video.js/dist/video-js.css";
import "videojs-hotkeys";

const props = defineProps({
  options: {
    type: Object,
    default() {
      return {};
    },
  },
});

let player = null as ReturnType<typeof videojs> | null;
const videoContainer = ref<HTMLElement>();

function refresh() {
  player?.dispose();

  let video = document.createElement("video");
  video.className = "video-js";
  videoContainer.value!.appendChild(video);
  player = videojs(
    video,
    {
      ...props.options,
      plugins: {
        hotkeys: {
          enableVolumeScroll: false,
        },
      },
    },
    function () {
      video.focus();
    }
  );
}

onUnmounted(() => player?.dispose());

defineExpose({ refresh });
</script>
