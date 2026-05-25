<script lang="ts" setup>
  defineOptions({ inheritAttrs: false });
</script>

<!-- Clips the swipe animation; position:relative needed for the exit absolute trick -->
<template>
  <div class="relative overflow-hidden" v-bind="$attrs">
    <slot />
  </div>
</template>
