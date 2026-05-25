<script lang="ts" setup>
  import { motion } from 'motion-v';
</script>

<template>
  <motion.div
    class="absolute inset-x-0 top-0 z-40"
    :initial="{ y: -90, opacity: 0 }"
    :animate="{ y: 0, opacity: 1 }"
    :transition="{ type: 'spring', stiffness: 220, damping: 22, delay: 0.1 }"
  >
    <UIDecorationBlock3D
      variant="bottom"
      class="px-6 flex justify-between bg-[url(/images/plane/oak_log.webp)] p-4 items-center container mx-auto shadow-mc-panel"
    >
      <ModuleAuth />
      <div class="flex items-center gap-4">
        <UILink to="/">{{ $t('nav.home') }}</UILink>
        <UILink to="/about">{{ $t('nav.about') }}</UILink>
        <UILink to="/rules">{{ $t('nav.rules') }}</UILink>

        <WidgetLangSwitcher />
        <WidgetSoundToggle />
      </div>
    </UIDecorationBlock3D>
  </motion.div>
</template>

<style></style>
