<script lang="ts" setup>
  import useEmblaCarousel from 'embla-carousel-vue';
  import type {
    EmblaCarouselType,
    EmblaOptionsType,
    EmblaPluginType,
  } from 'embla-carousel';

  defineOptions({ inheritAttrs: false });

  interface ISliderProps {
    options?: EmblaOptionsType;
    plugins?: EmblaPluginType[];
  }

  const props = withDefaults(defineProps<ISliderProps>(), {
    options: () => ({}),
    plugins: () => [],
  });

  const [emblaRef, emblaApi] = useEmblaCarousel(props.options, props.plugins);

  const canScrollPrev = ref(false);
  const canScrollNext = ref(false);

  const updateScrollState = (api: EmblaCarouselType) => {
    canScrollPrev.value = api.canScrollPrev();
    canScrollNext.value = api.canScrollNext();
  };

  watch(emblaApi, (api) => {
    if (!api) return;
    updateScrollState(api);
    api.on('select', () => updateScrollState(api));
    api.on('reInit', () => updateScrollState(api));
  });

  const scrollPrev = () => emblaApi.value?.scrollPrev();
  const scrollNext = () => emblaApi.value?.scrollNext();

  provide(SLIDER_KEY, {
    emblaRef,
    emblaApi,
    scrollPrev,
    scrollNext,
    canScrollPrev,
    canScrollNext,
  });

  defineExpose({ emblaApi, scrollPrev, scrollNext });
</script>

<template>
  <div
    :class="cn('relative', $attrs.class)"
    v-bind="$attrs"
  >
    <slot />
  </div>
</template>
