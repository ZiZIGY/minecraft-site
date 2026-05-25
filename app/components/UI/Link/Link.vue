<script lang="ts" setup>
  import type { NuxtLinkProps } from '#app';
  import buttonClick from '~/assets/sfx/button_click.mp3';
  import { linkVariants, type TLinkVariants } from './variants';

  interface ILinkProps extends NuxtLinkProps {
    size?: TLinkVariants['size'];
    disabled?: boolean;
  }

  const props = defineProps<ILinkProps>();

  const buttonSfx = useSFX(buttonClick, { volume: 0.5, interrupt: false });
</script>

<template>
  <NuxtLink
    v-bind="$props"
    :aria-disabled="$props.disabled"
    :class="
      cn(
        linkVariants({ size: $props.size, disabled: $props.disabled }),
        $attrs.class
      )
    "
    @click="$route.path !== props.to && buttonSfx.play()"
  >
    <slot />
  </NuxtLink>
</template>
