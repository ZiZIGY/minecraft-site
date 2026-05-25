<script lang="ts" setup>
  import { motion } from 'motion-v';
</script>

<template>
  <div
    class="relative h-svh flex flex-col items-center justify-center overflow-hidden box-content"
  >
    <UIParallax>
      <video
        autoplay
        muted
        loop
        class="absolute inset-0 object-cover w-full h-full brightness-60 blur-[2px] select-none"
      >
        <source
          src="/videos/overgrown.mp4"
          type="video/mp4"
        />
      </video>
    </UIParallax>

    <div
      class="relative z-10 flex flex-col items-center gap-8 text-center px-4 container"
    >
      <div class="relative overflow-visible pointer-events-none">
        <motion.img
          src="/logo.png"
          alt="YACHOS MC"
          draggable="false"
          class="w-7xl max-w-full drop-shadow-mc-teal relative z-10 select-none"
          :initial="{ opacity: 0, scale: 0.3 }"
          :animate="{ opacity: 1, scale: 1 }"
          :transition="{ duration: 1.2, ease: 'easeOut' }"
        />

        <ClientOnly>
          <WidgetFloatingBlocks />
        </ClientOnly>
      </div>

      <motion.p
        class="text-white text-shadow-mc text-2xl max-w-sm leading-loose"
        :initial="{ opacity: 0, y: 20 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.7, delay: 0.45, ease: 'easeOut' }"
      >
        {{ $t('hero.tagline_prefix') }}
        <UIParticleText class="text-fuchsia-500">
          {{ $t('hero.tagline_highlight') }}
        </UIParticleText>
        <br />{{ $t('hero.tagline_suffix') }}
      </motion.p>

      <motion.div
        :initial="{ opacity: 0, y: 20 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.7, delay: 0.65, ease: 'easeOut' }"
      >
        <UIButton size="lg">
          {{ $t('hero.cta') }}
        </UIButton>
      </motion.div>
    </div>
  </div>
</template>

<style></style>
