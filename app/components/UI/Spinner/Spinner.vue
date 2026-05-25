<script lang="ts" setup>
  import { spinnerVariants, type TSpinnerVariants } from './variants';

  const SIZE_MAP: Record<NonNullable<TSpinnerVariants['size']>, string> = {
    sm: '14px',
    md: '20px',
    lg: '28px',
  };

  interface IProps {
    size?: TSpinnerVariants['size'];
  }

  const props = withDefaults(defineProps<IProps>(), { size: 'md' });
</script>

<template>
  <span
    :class="cn('spinner', $attrs.class)"
    :style="{ '--d': SIZE_MAP[props.size] }"
  />
</template>

<style scoped>
  .spinner {
    display: inline-block;
    width: 4px;
    height: 4px;
    box-shadow:
      calc(1 * var(--d)) calc(0 * var(--d)) 0 -1.7px
        color-mix(in srgb, currentColor 3%, transparent),
      calc(0.707 * var(--d)) calc(0.707 * var(--d)) 0 -1.5px
        color-mix(in srgb, currentColor 9%, transparent),
      calc(0 * var(--d)) calc(1 * var(--d)) 0 -1.3px
        color-mix(in srgb, currentColor 20%, transparent),
      calc(-0.707 * var(--d)) calc(0.707 * var(--d)) 0 -1.1px
        color-mix(in srgb, currentColor 36%, transparent),
      calc(-1 * var(--d)) calc(0 * var(--d)) 0 -0.8px
        color-mix(in srgb, currentColor 56%, transparent),
      calc(-0.707 * var(--d)) calc(-0.707 * var(--d)) 0 -0.4px
        color-mix(in srgb, currentColor 78%, transparent),
      calc(0 * var(--d)) calc(-1 * var(--d)) 0 0px currentColor;
    animation: spinner-rotate 1s infinite steps(8);
  }

  @keyframes spinner-rotate {
    100% {
      transform: rotate(1turn);
    }
  }
</style>
