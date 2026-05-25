<script lang="ts" setup>
  import { block3dVariants, type TBlock3DVariants } from './variants';

  interface IProps {
    variant?: TBlock3DVariants['variant'];
  }

  const props = withDefaults(defineProps<IProps>(), {
    variant: 'top',
  });

  defineOptions({ inheritAttrs: false });
</script>

<template>
  <div
    v-bind="{ ...$attrs, class: undefined }"
    :class="
      cn(block3dVariants({ variant: props.variant }), $attrs.class as string)
    "
  >
    <slot />
  </div>
</template>
