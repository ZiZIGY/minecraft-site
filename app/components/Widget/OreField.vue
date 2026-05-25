<script lang="ts" setup>
  import { motion } from 'motion-v';
  import stoneSfx from '~/assets/sfx/stone_break.mp3';

  const ORE_TYPES = [
    { src: '/images/plane/iron_ore.webp', glow: '#d4a66a' },
    { src: '/images/plane/gold_ore.webp', glow: '#f5c518' },
    { src: '/images/plane/diamon_ore.webp', glow: '#20e8f0' },
  ] as const;

  const COLS = 4;
  const ROWS = 3;
  const CELL_W = 100 / COLS;
  const CELL_H = 100 / ROWS;
  const PAD_X = 4;
  const PAD_Y = 4;

  interface IOre {
    id: number;
    src: string;
    glow: string;
    x: number;
    y: number;
    delay: number;
    duration: number;
  }

  interface IBurst {
    id: number;
    x: string;
    y: string;
    color: string;
  }

  const ores = ref<IOre[]>([]);
  const bursts = ref<IBurst[]>([]);

  const { play } = useSFX(stoneSfx, { volume: 0.4 });

  onMounted(() => {
    ores.value = Array.from({ length: COLS * ROWS }, (_, i) => {
      const col = i % COLS;
      const row = Math.floor(i / COLS);
      const type = ORE_TYPES[Math.floor(Math.random() * ORE_TYPES.length)];

      return {
        id: i,
        src: type!.src,
        glow: type!.glow,
        x: col * CELL_W + PAD_X + Math.random() * (CELL_W - 2 * PAD_X),
        y: row * CELL_H + PAD_Y + Math.random() * (CELL_H - 2 * PAD_Y),
        delay: Math.random() * 4,
        duration: 2.5 + Math.random() * 2,
      };
    });
  });

  function breakOre(ore: IOre) {
    play();

    bursts.value.push({
      id: Date.now(),
      x: `calc(${ore.x}% + 4rem)`,
      y: `calc(${ore.y}% + 4rem)`,
      color: ore.glow,
    });
    ores.value = ores.value.filter((o) => o.id !== ore.id);
  }

  function removeBurst(id: number) {
    bursts.value = bursts.value.filter((b) => b.id !== id);
  }
</script>

<template>
  <div class="absolute inset-0 overflow-hidden pointer-events-none">
    <!-- ores -->
    <motion.div
      v-for="ore in ores"
      :key="ore.id"
      class="ore absolute pointer-events-auto cursor-pointer"
      :style="{
        left: `${ore.x}%`,
        top: `${ore.y}%`,
        '--glow': ore.glow,
        '--dur': `${ore.duration}s`,
        '--delay': `${ore.delay}s`,
      }"
      :initial="{ opacity: 0, scale: 0, rotate: -15 }"
      :whileInView="{ opacity: 1, scale: 1, rotate: 0 }"
      :transition="{
        type: 'spring',
        stiffness: 240,
        damping: 16,
        delay: ore.delay * 0.35,
      }"
      @click="breakOre(ore)"
    >
      <NuxtImg
        :src="ore.src"
        class="size-32 select-none hover:brightness-125 transition-[filter] duration-150"
        :style="{ imageRendering: 'pixelated' }"
        draggable="false"
        alt=""
      />
    </motion.div>

    <!-- particle bursts — positioned at the center of the broken ore -->
    <div
      v-for="burst in bursts"
      :key="burst.id"
      class="absolute pointer-events-none"
      :style="{ left: burst.x, top: burst.y }"
    >
      <UIDecorationVoxelBurst
        :color="burst.color"
        @done="removeBurst(burst.id)"
      />
    </div>
  </div>
</template>

<style scoped>
  .ore {
    animation: ore-pulse var(--dur) ease-in-out var(--delay) infinite;
  }

  @keyframes ore-pulse {
    0%,
    100% {
      filter: drop-shadow(0 0 4px var(--glow)) brightness(0.8);
    }
    50% {
      filter: drop-shadow(0 0 10px var(--glow)) brightness(1.1);
    }
  }
</style>
