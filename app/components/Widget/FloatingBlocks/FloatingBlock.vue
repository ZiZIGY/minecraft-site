<script lang="ts" setup>
  import { motion } from 'motion-v';

  interface IProps {
    src: string;
    sound: string;
    index: number;
    color?: string;
    size?: number;
    tilt?: string;
    zIndex?: number;
  }

  const props = withDefaults(defineProps<IProps>(), {
    color: '#ffffff',
    size: 80,
    tilt: '0deg',
    zIndex: 10,
  });

  interface IParticle {
    id: number;
    dx: string;
    dy: string;
    rotate: string;
    size: string;
    shade: string;
  }

  const emit = defineEmits<{ broken: [particles: IParticle[]] }>();

  const { play } = useSFX(props.sound, { volume: 0.4 });

  const broken = shallowRef(false);

  function onBreak() {
    if (broken.value) return;

    play();

    const particles = Array.from({ length: 14 }, (_, i) => ({
      id: i,
      dx: `${(Math.random() - 0.5) * 180}px`,
      dy: `${(Math.random() - 0.5) * 180}px`,
      rotate: `${Math.random() * 540 - 270}deg`,
      size: `${6 + Math.floor(Math.random() * 10)}px`,
      shade: `color-mix(in srgb, ${props.color} ${70 + Math.floor(Math.random() * 30)}%, black)`,
    }));

    broken.value = true;
    emit('broken', particles);
  }
</script>

<template>
  <Transition name="block">
    <motion.div
      class="absolute cursor-pointer select-none"
      v-if="!broken"
      :style="{
        width: `${size}px`,
        height: `${size}px`,
        '--tilt': tilt,
        zIndex,
      }"
      :initial="{ scale: 0, opacity: 0 }"
      :animate="{ scale: 1, opacity: 1 }"
      :exit="{
        scale: 0,
        opacity: 0,
        transition: { duration: 0.12, type: 'tween' },
      }"
      :transition="{
        delay: index * 0.12,
        type: 'spring',
        bounce: 0.5,
        duration: 0.6,
      }"
    >
      <img
        :src="src"
        class="block-float w-full h-full hover:brightness-125 transition-[filter] duration-150"
        draggable="false"
        @click="onBreak"
      />
    </motion.div>
  </Transition>
</template>

<style scoped>
  .block-float {
    animation: float 3s ease-in-out calc(v-bind(index) * -0.55s) infinite;
  }

  @keyframes float {
    0%,
    100% {
      transform: translateY(0px) rotate(var(--tilt, 0deg));
    }
    50% {
      transform: translateY(-14px) rotate(var(--tilt, 0deg));
    }
  }

  .block-leave-active {
    animation: block-pop 0.1s ease-in forwards;
  }
  @keyframes block-pop {
    0% {
      transform: rotate(var(--tilt, 0deg)) scale(1);
      opacity: 1;
    }
    100% {
      transform: rotate(var(--tilt, 0deg)) scale(0);
      opacity: 0;
    }
  }
</style>
