<script lang="ts" setup>
  import { motion } from 'motion-v';
  import { frameVariants, type TFrameVariants } from './variants';

  interface IFrameProps {
    src?: string;
    size?: TFrameVariants['size'];
    disabled?: boolean;
  }

  withDefaults(defineProps<IFrameProps>(), {
    src: '/images/heads/steeve.png',
    size: 'md',
  });

  const spring = { type: 'spring' as const, stiffness: 260, damping: 20 };
</script>

<template>
  <motion.div
    :class="cn(frameVariants($props), $attrs.class)"
    :initial="{ scale: 0.8, opacity: 0 }"
    :whileInView="{ scale: 1, opacity: 1 }"
    :viewport="{ once: true }"
    :transition="spring"
  >
    <motion.img
      :src="src"
      class="size-3/4"
      draggable="false"
      :initial="{ scale: 0.4 }"
      :whileInView="{ scale: 1 }"
      :viewport="{ once: true }"
      :transition="spring"
    />
  </motion.div>
</template>
