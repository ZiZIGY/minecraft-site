<script lang="ts" setup>
  import type { ITabsContext } from './index.vue';

  const props = defineProps<{ value: string }>();

  const ctx = inject<ITabsContext>('tabs')!;

  onMounted(() => ctx.registerTab(props.value));

  const isActive = computed(() => ctx.active.value === props.value);
</script>

<template>
  <button
    type="button"
    class="tab rounded"
    :class="isActive ? 'tab_active' : 'tab_inactive'"
    @click="ctx.setActive(props.value)"
  >
    <slot />
  </button>
</template>

<style scoped>
  .tab {
    position: relative;
    padding: 5px 16px 7px;
    background: var(--color-modal);
    border-top: 3px solid #ffffff;
    border-left: 3px solid #ffffff;
    border-right: 3px solid #555555;
    border-bottom: 3px solid #555555;
    font-family: var(--font-minecraft);
    font-size: 11px;
    color: #404040;
    cursor: pointer;
    white-space: nowrap;
    margin-bottom: -4px;
  }

  .tab_active {
    z-index: 3;
    border-bottom-color: var(--color-modal);
  }

  .tab_inactive {
    z-index: 1;
    filter: brightness(0.8);
    &:hover {
      filter: brightness(1ц);
    }
  }
</style>
