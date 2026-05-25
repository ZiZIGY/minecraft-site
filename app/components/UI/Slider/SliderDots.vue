<script lang="ts" setup>
  const { emblaApi } = useSliderContext();

  const total = ref(0);
  const selected = ref(0);

  function sync() {
    if (!emblaApi.value) return;
    total.value = emblaApi.value.scrollSnapList().length;
    selected.value = emblaApi.value.selectedScrollSnap();
  }

  watch(
    emblaApi,
    (api) => {
      if (!api) return;
      sync();
      api.on('select', sync);
      api.on('reInit', sync);
    },
    { immediate: true }
  );
</script>

<template>
  <div
    v-if="total > 1"
    class="flex items-center justify-center gap-2"
  >
    <UISliderDot
      v-for="i in total"
      :key="i"
      :index="i - 1"
      :active="selected === i - 1"
      @click="emblaApi?.scrollTo($event)"
    />
  </div>
</template>
