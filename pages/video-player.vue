<template>
  <div>
    <v-card :title="filename || 'Choose a video file'" class="my-3"></v-card>
    <video-player :options="videoOptions" ref="player" />
    <v-btn block @click="videoFileInput!.click()" class="my-3">
      CHOOSE VIDEO FILE
      <input
        type="file"
        ref="videoFileInput"
        @input="updateVideoSrc($event)"
        style="display: none"
        accept="video/*"
      />
    </v-btn>
  </div>
</template>

<script setup lang="ts">
import VideoPlayer from "@/components/video-js.vue";

const videoOptions = ref({
  autoplay: true,
  controls: true,
  sources: [] as { src: string; type: string }[],
  fluid: true,
});

const player = ref<typeof VideoPlayer>();
const videoFileInput = ref<HTMLInputElement>();
const filename = ref("");

function updateVideoSrc(event: Event) {
  const target = event.target as HTMLInputElement | undefined;
  if (!target?.files?.[0]) return;

  videoOptions.value.sources[0] = {
    src: URL.createObjectURL(target.files[0]),
    type: target.files[0].type,
  };

  filename.value = target.files[0].name;

  player.value!.refresh();
}
</script>
