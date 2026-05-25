<script lang="ts" setup>
  import { motion } from 'motion-v';

  const SECTIONS = [
    {
      titleKey: 'devs.sections.developers',
      rainbow: true,
      members: [
        {
          name: 'ChokerWithA.45',
          src: '/images/heads/choker.webp',
          roleKey: 'developer',
        },
        {
          name: 'ZiZIGY',
          src: '/images/heads/zizigy.webp',
          roleKey: 'developer',
        },
        { name: 'TFX', src: '/images/heads/tfx.webp', roleKey: 'developer' },
      ],
    },
    {
      titleKey: 'devs.sections.moderators',
      rainbow: false,
      members: [
        {
          name: 'ChokerWithA.45',
          src: '/images/heads/choker.webp',
          roleKey: 'owner',
        },
        {
          name: 'Steeve',
          src: '/images/heads/steeve.png',
          roleKey: 'moderator',
        },
        {
          name: 'Steeve',
          src: '/images/heads/steeve.png',
          roleKey: 'moderator',
        },
      ],
    },
  ];
</script>

<template>
  <div class="py-48 min-h-svh relative">
    <video
      autoplay
      muted
      loop
      class="absolute inset-0 object-cover w-full h-full brightness-40 blur-[2px] select-none"
    >
      <source
        src="/videos/castle.mp4"
        type="video/mp4"
      />
    </video>

    <motion.div
      class="relative container mx-auto z-20"
      :initial="{ opacity: 0, y: 48, scale: 0.97 }"
      :whileInView="{ opacity: 1, y: 0, scale: 1 }"
      :transition="{ type: 'spring' as const, stiffness: 180, damping: 24 }"
    >
      <UIPanel>
        <template #header>
          <div class="flex flex-col gap-2">
            <UIRainbowText
              :text="$t('devs.title')"
              class="font-minecraft text-5xl text-shadow-mc leading-none"
            />
            <p class="font-minecraft text-white/75 text-base text-shadow-mc">
              {{ $t('devs.subtitle') }}
            </p>
          </div>
        </template>

        <div class="flex flex-col gap-10">
          <div
            v-for="(section, si) in SECTIONS"
            :key="si"
          >
            <div class="mb-5">
              <UIRainbowText
                v-if="section.rainbow"
                :text="$t(section.titleKey)"
                class="font-minecraft text-2xl text-shadow-mc"
              />
              <span
                v-else
                class="font-minecraft text-2xl text-white text-shadow-mc"
              >
                {{ $t(section.titleKey) }}
              </span>
            </div>

            <UISlider
              :options="{
                align: 'start',
                loop: false,
                containScroll: 'trimSnaps',
              }"
            >
              <UISliderContent container-class="gap-2">
                <UISliderItem
                  v-for="(dev, i) in section.members"
                  :key="i"
                  class="basis-auto"
                >
                  <motion.div
                    :initial="{ opacity: 0, y: 20 }"
                    :whileInView="{ opacity: 1, y: 0 }"
                    :transition="{
                      type: 'spring' as const,
                      stiffness: 240,
                      damping: 22,
                      delay: i * 0.07,
                    }"
                  >
                    <UIUserCard
                      :name="dev.name"
                      :src="dev.src"
                      :role="$t(`devs.roles.${dev.roleKey}`)"
                    />
                  </motion.div>
                </UISliderItem>
              </UISliderContent>

              <div class="flex items-center gap-3 mt-5">
                <UISliderButton direction="prev" />
                <UISliderButton direction="next" />
              </div>

              <UISliderDots class="mt-4" />
            </UISlider>
          </div>
        </div>

        <template #footer></template>
      </UIPanel>
    </motion.div>
  </div>
</template>

<style></style>
