<script lang="ts" setup>
  export interface ITabsContext {
    active:      ComputedRef<string>;
    dir:         Ref<number>;
    setActive:   (value: string) => void;
    registerTab: (value: string) => void;
  }

  const modelValue = defineModel<string>({ required: true });

  const tabValues = ref<string[]>([]);
  const dir       = ref(0);

  function registerTab(value: string) {
    if (!tabValues.value.includes(value)) tabValues.value.push(value);
  }

  function setActive(value: string) {
    const prev = tabValues.value.indexOf(modelValue.value);
    const next = tabValues.value.indexOf(value);
    dir.value       = next > prev ? 1 : -1;
    modelValue.value = value;
  }

  provide<ITabsContext>('tabs', {
    active:      computed(() => modelValue.value),
    dir,
    setActive,
    registerTab,
  });
</script>

<template>
  <slot />
</template>
