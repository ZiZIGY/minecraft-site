<script lang="ts" setup></script>

<template>
  <div
    :class="cn('min-w-0 shrink-0 grow-0 basis-full flex flex-col', $attrs.class)"
    v-bind="$attrs"
  >
    <slot />
  </div>
</template>
