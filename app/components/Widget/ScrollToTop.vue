<script lang="ts" setup>
  import { motion, AnimatePresence } from 'motion-v';
  import enderTeleport from '~/assets/sfx/ender_teleport.mp3';

  const { y } = useWindowScroll();
  const isVisible = computed(() => y.value);

  const sfx = useSFX(enderTeleport, { volume: 0.65 });

  const spring = { type: 'spring' as const, stiffness: 280, damping: 18 };

  function scrollToTop() {
    sfx.play();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
</script>

<template>
  <AnimatePresence>
    <motion.button
      v-if="isVisible"
      class="scroll-top"
      aria-label="Наверх"
      :initial="{ opacity: 0, scale: 0.4, y: 20 }"
      :animate="{ opacity: 1, scale: 1, y: 0 }"
      :exit="{ opacity: 0, scale: 0.4, y: 20 }"
      :transition="spring"
      :while-hover="{ scale: 1.15 }"
      :while-press="{ scale: 0.9 }"
      @click.once="scrollToTop"
    >
      <NuxtImg
        src="/images/plane/ender_pearl.webp"
        class="size-full select-none"
        draggable="false"
        alt="Наверх"
      />
    </motion.button>
  </AnimatePresence>
</template>

<style scoped>
  .scroll-top {
    position: fixed;
    bottom: 2rem;
    cursor: pointer;
    right: 2rem;
    z-index: 50;
    width: 3.5rem;
    height: 3.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    filter: drop-shadow(0 0 10px color-mix(in srgb, #2dd4bf 60%, transparent))
      drop-shadow(0 4px 8px rgba(0, 0, 0, 0.7));
    transition: filter 0.2s;

    &:hover {
      filter: drop-shadow(0 0 18px color-mix(in srgb, #2dd4bf 90%, transparent))
        drop-shadow(0 6px 12px rgba(0, 0, 0, 0.8));
    }
  }
</style>
