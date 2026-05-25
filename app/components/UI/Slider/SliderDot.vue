<script lang="ts" setup>
  import buttonClick from '~/assets/sfx/button_click.mp3';

  const props = defineProps<{
    index: number;
    active: boolean;
  }>();

  const emit = defineEmits<{
    click: [index: number];
  }>();

  const sfx = useSFX(buttonClick, { volume: 0.5 });

  function onClick() {
    sfx.play();
    emit('click', props.index);
  }
</script>

<template>
  <button
    type="button"
    :aria-label="`Слайд ${props.index + 1}`"
    class="transition-[opacity,transform] duration-150 hover:scale-125 cursor-pointer"
    :class="props.active && 'scale-110'"
    @click="onClick"
  >
    <NuxtImg
      :src="
        props.active
          ? '/images/plane/lamp_active.png'
          : '/images/plane/lamp.png'
      "
      class="size-5 select-none"
      draggable="false"
      alt=""
    />
  </button>
</template>
