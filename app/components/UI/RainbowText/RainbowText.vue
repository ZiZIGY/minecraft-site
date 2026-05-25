<script lang="ts" setup>
  interface IProps {
    text: string;
    speed?: number;
    spread?: number;
  }

  const props = withDefaults(defineProps<IProps>(), {
    speed: 2.5,
    spread: 0.12,
  });

  const chars = computed(() => props.text.split(''));
</script>

<template>
  <span :aria-label="text">
    <span
      v-for="(char, i) in chars"
      :key="i"
      class="rainbow-char"
      aria-hidden="true"
      :style="{
        '--i': i,
        '--speed': `${speed}s`,
        '--spread': `${spread}s`,
      }"
    >{{ char === ' ' ? ' ' : char }}</span>
  </span>
</template>

<style scoped>
  .rainbow-char {
    display: inline;
    animation: rainbow var(--speed) linear infinite;
    animation-delay: calc(var(--i) * var(--spread) * -1);
  }

  @keyframes rainbow {
    0%   { color: hsl(0,   100%, 60%); }
    16%  { color: hsl(60,  100%, 55%); }
    33%  { color: hsl(120, 100%, 50%); }
    50%  { color: hsl(180, 100%, 50%); }
    66%  { color: hsl(240, 100%, 65%); }
    83%  { color: hsl(300, 100%, 60%); }
    100% { color: hsl(360, 100%, 60%); }
  }
</style>
