<script lang="ts" setup>
  defineOptions({ inheritAttrs: false });

  defineSlots<{
    header?(): unknown;
    default?(): unknown;
    footer?(): unknown;
  }>();
</script>

<template>
  <div
    v-bind="$attrs"
    class="panel"
  >
    <div
      v-if="$slots.header"
      class="panel__header bg-[url(/images/plane/oak_log.webp)] bg-size-[8rem] bg-repeat px-8 py-6"
    >
      <slot name="header" />
    </div>

    <div
      v-if="$slots.default"
      class="bg-[url(/images/plane/oak_planks.webp)] bg-size-[8rem] bg-repeat px-8 py-12"
    >
      <slot />
    </div>

    <div
      v-if="$slots.footer"
      class="panel__footer bg-[url(/images/plane/oak_log.webp)] bg-size-[8rem] bg-repeat px-8 py-5"
    >
      <slot name="footer" />
    </div>
  </div>
</template>

<style scoped>
  .panel {
    box-shadow: 0 6px 24px rgba(0, 0, 0, 0.55);
  }

  /* тень ВНИЗ на доски — создаёт 3D эффект "шапки" */
  .panel__header {
    position: relative;
    z-index: 1;
    box-shadow: 0 12px 28px 8px rgba(0, 0, 0, 0.75);
  }

  /* тень ВНИЗ за пределы панели — "ножки" выступают */
  .panel__footer {
    position: relative;
    z-index: 1;
    box-shadow: 0 6px 14px 2px rgba(0, 0, 0, 0.6);
  }
</style>
