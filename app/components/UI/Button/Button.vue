<script lang="ts" setup>
  import { buttonVariants, type TButtonVariants } from './variants';
  import buttonClick from '~/assets/sfx/button_click.mp3';

  interface IButtonProps {
    variant?: TButtonVariants['variant'];
    size?: TButtonVariants['size'];
    disabled?: boolean;
    type?: 'button' | 'submit' | 'reset';
  }

  const props = withDefaults(defineProps<IButtonProps>(), {
    variant: 'default',
    size: 'md',
    type: 'button',
  });

  const sfx = useSFX(buttonClick, { volume: 0.5 });
</script>

<template>
  <button
    :type="props.type"
    :disabled="props.disabled"
    :class="cn(buttonVariants(props), $attrs.class)"
    v-bind="$attrs"
    @click="sfx.play()"
  >
    <slot />
  </button>
</template>

