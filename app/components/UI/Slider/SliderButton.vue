<script lang="ts" setup>
  import type { TButtonVariants } from '~/components/UI/Button/variants';

  interface ISliderButtonProps {
    direction: 'prev' | 'next';
    variant?: TButtonVariants['variant'];
    size?: TButtonVariants['size'];
  }

  const props = withDefaults(defineProps<ISliderButtonProps>(), {
    variant: 'default',
    size: 'icon',
  });

  const { scrollPrev, scrollNext, canScrollPrev, canScrollNext } =
    useSliderContext();

  const canScroll = computed(() =>
    props.direction === 'prev' ? canScrollPrev.value : canScrollNext.value
  );

  function scroll() {
    if (props.direction === 'prev') scrollPrev();
    else scrollNext();
  }
</script>

<template>
  <UIButton
    :variant="props.variant"
    :size="props.size"
    :disabled="!canScroll"
    :aria-label="props.direction === 'prev' ? 'Previous slide' : 'Next slide'"
    @click="scroll"
  >
    <slot>
      <Icon
        :name="
          props.direction === 'prev' ? 'mdi:chevron-left' : 'mdi:chevron-right'
        "
        class="size-5"
      />
    </slot>
  </UIButton>
</template>
