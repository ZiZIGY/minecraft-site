<script lang="ts" setup>
  import { motion, AnimatePresence } from 'motion-v';
  import type { ITabsContext } from './index.vue';

  const props = defineProps<{ value: string }>();

  const ctx = inject<ITabsContext>('tabs')!;

  const isActive = computed(() => ctx.active.value === props.value);

  const spring = { type: 'spring' as const, stiffness: 320, damping: 28 };
</script>

<template>
  <AnimatePresence>
    <motion.div
      v-if="isActive"
      :key="props.value"
      :initial="{ x: `${ctx.dir.value * 100}%`, opacity: 0 }"
      :animate="{ x: '0%', opacity: 1 }"
      :exit="{ x: `${-ctx.dir.value * 100}%`, opacity: 0, position: 'absolute', top: 0, left: 0, right: 0 }"
      :transition="spring"
    >
      <slot />
    </motion.div>
  </AnimatePresence>
</template>
