<script lang="ts" setup>
  /**
   * UIDecorationVoxelBurst — reusable pixel-block particle burst.
   *
   * Mount it inside a position:absolute wrapper at the break origin.
   * Emits 'done' when the animation finishes so the parent can remove it.
   *
   * Props:
   *   color  — base CSS color for particle shading (e.g. '#20e8f0')
   *   count  — number of particles (default 14)
   *   spread — max displacement in px (default 180)
   */
  interface IProps {
    color: string;
    count?: number;
    spread?: number;
  }

  const props = withDefaults(defineProps<IProps>(), {
    count: 14,
    spread: 180,
  });

  const emit = defineEmits<{ done: [] }>();

  function generateParticles() {
    return Array.from({ length: props.count }, (_, i) => ({
      id: i,
      dx: `${(Math.random() - 0.5) * props.spread}px`,
      dy: `${(Math.random() - 0.5) * props.spread}px`,
      rotate: `${Math.random() * 540 - 270}deg`,
      size: `${6 + Math.floor(Math.random() * 10)}px`,
      shade: `color-mix(in srgb, ${props.color} ${70 + Math.floor(Math.random() * 30)}%, black)`,
    }));
  }
</script>

<template>
  <span
    v-for="(particle, pi) in generateParticles()"
    :key="particle.id"
    class="particle absolute"
    :style="{
      width: particle.size,
      height: particle.size,
      backgroundColor: particle.shade,
      '--dx': particle.dx,
      '--dy': particle.dy,
      '--p-rotate': particle.rotate,
    }"
    @animationend="pi === 0 ? emit('done') : undefined"
  />
</template>

<style scoped>
  .particle {
    left: 0;
    top: 0;
    transform: translate(-50%, -50%);
    image-rendering: pixelated;
    animation: voxel-burst 0.55s ease-out forwards;
  }

  @keyframes voxel-burst {
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
