<script lang="ts" setup>
  interface IProps {
    /** Классы для внутреннего flex-контейнера (например gap-4, gap-6) */
    containerClass?: string;
  }

  const props = defineProps<IProps>();
  const { emblaRef } = useSliderContext();
</script>

<template>
  <div
    ref="emblaRef"
    :class="cn('overflow-hidden', $attrs.class)"
    v-bind="$attrs"
  >
    <!-- Container: flex-row, drag area -->
    <div
      :class="
        cn('flex items-stretch touch-[pan-y_pinch-zoom]', props.containerClass)
      "
    >
      <slot />
    </div>
  </div>
</template>
