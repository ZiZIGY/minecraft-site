<script lang="ts" setup>
  import FloatingBlock from './FloatingBlock.vue';
  import grassSfx from '~/assets/sfx/grass_break.mp3';
  import stoneSfx from '~/assets/sfx/stone_break.mp3';
  import woodSfx from '~/assets/sfx/wood_break.mp3';
  import glassSfx from '~/assets/sfx/glass_break.mp3';

  const BLOCK_COUNT = 6;
  const RX = 46;
  const RY = 48;
  const MIN_SIZE = 64;
  const MAX_SIZE = 100;

  const ANGLES = Array.from(
    { length: BLOCK_COUNT },
    (_, i) => (-60 + i * 60) * (Math.PI / 180)
  );

  const IMAGES = [
    { src: '/images/blocks/grass.webp', sound: grassSfx, color: '#5d8a3c' },
    { src: '/images/blocks/cobblestone.webp', sound: stoneSfx, color: '#8a8a8a' },
    { src: '/images/blocks/oak_planks.webp', sound: woodSfx, color: '#c8984e' },
    { src: '/images/blocks/glass.webp', sound: glassSfx, color: '#b8dde0' },
  ];

  type TParticle = {
    id: number;
    dx: string;
    dy: string;
    rotate: string;
    size: string;
    shade: string;
  };

  type TParticleGroup = {
    id: number;
    left: string;
    top: string;
    zIndex: number;
    particles: TParticle[];
  };

  function shuffle<T>(arr: T[]): T[] {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j]!, a[i]!];
    }
    return a;
  }

  function createBlocks() {
    const slots = shuffle([...IMAGES, ...IMAGES]).slice(0, BLOCK_COUNT);
    return slots.map((img, i) => ({
      id: Date.now() + i,
      src: img.src,
      sound: img.sound,
      color: img.color,
      size: MIN_SIZE + Math.floor(Math.random() * (MAX_SIZE - MIN_SIZE + 1)),
      zIndex: 5 + Math.floor(Math.random() * 16),
      left: `${(50 + RX * Math.cos(ANGLES[i]!)).toFixed(2)}%`,
      top: `${(50 + RY * Math.sin(ANGLES[i]!)).toFixed(2)}%`,
      tilt: `${(i % 2 === 0 ? 1 : -1) * (5 + Math.floor(Math.random() * 9))}deg`,
    }));
  }

  const blocks = ref(createBlocks());
  const brokenCount = ref(0);
  const particleGroups = ref<TParticleGroup[]>([]);

  function onBlockBroken({ left, top, zIndex, particles }: Omit<TParticleGroup, 'id'>) {
    particleGroups.value.push({ id: Date.now(), left, top, zIndex, particles });

    brokenCount.value++;
    if (brokenCount.value === BLOCK_COUNT) {
      blocks.value = [];
    }
  }

  function onAllExited() {
    if (blocks.value.length === 0) {
      blocks.value = createBlocks();
      brokenCount.value = 0;
    }
  }

  function removeParticleGroup(id: number) {
    particleGroups.value = particleGroups.value.filter(g => g.id !== id);
  }
</script>

<template>
  <AnimatePresence @exitComplete="onAllExited">
    <FloatingBlock
      v-for="(b, i) in blocks"
      :key="b.id"
      :index="i"
      :src="b.src"
      :sound="b.sound"
      :color="b.color"
      :size="b.size"
      :zIndex="b.zIndex"
      :tilt="b.tilt"
      class="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
      :style="{ left: b.left, top: b.top }"
      @broken="(particles) => onBlockBroken({ left: b.left, top: b.top, zIndex: b.zIndex, particles })"
    />
  </AnimatePresence>

  <div
    v-for="group in particleGroups"
    :key="group.id"
    class="absolute pointer-events-none"
    :style="{ left: group.left, top: group.top, zIndex: group.zIndex }"
  >
    <span
      v-for="(p, pi) in group.particles"
      :key="p.id"
      class="particle absolute"
      :style="{
        width: p.size,
        height: p.size,
        backgroundColor: p.shade,
        '--dx': p.dx,
        '--dy': p.dy,
        '--p-rotate': p.rotate,
      }"
      @animationend="pi === 0 ? removeParticleGroup(group.id) : undefined"
    />
  </div>
</template>

<style scoped>
  .particle {
    left: 0;
    top: 0;
    transform: translate(-50%, -50%);
    animation: break-out 0.55s ease-out forwards;
    image-rendering: pixelated;
  }

  @keyframes break-out {
    0% {
      transform: translate(-50%, -50%) rotate(0deg) scale(1);
      opacity: 1;
    }
    100% {
      transform: translate(calc(-50% + var(--dx)), calc(-50% + var(--dy)))
        rotate(var(--p-rotate)) scale(0);
      opacity: 0;
    }
  }
</style>
