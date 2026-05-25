<script lang="ts" setup>
  import type { TFrameVariants } from '~/components/UI/Frame/variants';

  interface IProps {
    name?: string;
    src?: string;
    role?: string;
    frameSize?: TFrameVariants['size'];
  }

  const props = withDefaults(defineProps<IProps>(), {
    name: 'Unknown',
    src: '/images/heads/steeve.png',
    role: 'Developer',
    frameSize: 'lg',
  });
</script>

<template>
  <div class="card flex flex-col items-center gap-3 p-4 text-center">
    <UIFrame
      :src="props.src"
      :size="props.frameSize"
    />
    <div class="flex flex-col gap-1">
      <span
        class="text-white font-minecraft text-shadow-mc text-base leading-none"
      >
        {{ props.name }}
      </span>
      <span class="text-white/60 font-minecraft text-sm leading-none">
        {{ props.role }}
      </span>
    </div>
  </div>
</template>

<style scoped>
  .card {
    /* background: linear-gradient(180deg, #1a1a1a 0%, #111 100%);
    border: 2px solid #555; */
    filter: drop-shadow(4px 4px 5px #000);
  }
</style>
