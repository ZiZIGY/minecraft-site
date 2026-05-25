<script lang="ts" setup>
  defineOptions({ inheritAttrs: false });
</script>

<!-- Прозрачная обёртка: лейаут задаётся через class снаружи -->
<template>
  <div v-bind="$attrs">
    <slot />
  </div>
</template>
