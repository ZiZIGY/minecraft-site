<script lang="ts" setup>
  interface IProps {
    count?: number;
  }

  const props = withDefaults(defineProps<IProps>(), {
    count: 12,
  });

  function generateParticles() {
    return Array.from({ length: props.count }, () => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 2.5}s`,
      duration: `${1.2 + Math.random() * 1.5}s`,
      dx: `${(Math.random() - 0.5) * 1.2}em`,
      dy: `${-(0.5 + Math.random() * 1.2)}em`,
      size: `${0.15 + Math.random() * 0.15}em`,
    }));
  }
</script>

<template>
  <span class="relative inline-block">
    <slot />
    <ClientOnly>
      <span
        v-for="(p, i) in generateParticles()"
        :key="i"
        class="particle absolute pointer-events-none"
        :style="{
          left: p.left,
          top: p.top,
          width: p.size,
          height: p.size,
          backgroundColor: 'currentColor',
          '--dx': p.dx,
          '--dy': p.dy,
          '--duration': p.duration,
          '--delay': p.delay,
        }"
      />
    </ClientOnly>
  </span>
</template>

<style scoped>
  .particle {
    animation: particle-float var(--duration) ease-out var(--delay) infinite
      both;
  }

  @keyframes particle-float {
    0% {
      transform: translate(0, 0) scale(1);
      opacity: 0;
    }
    20% {
      opacity: 0.85;
    }
    100% {
      transform: translate(var(--dx), var(--dy)) scale(0);
      opacity: 0;
    }
  }
</style>
