<script lang="ts" setup></script>

<template>
  <div class="divider">
    <UIDecorationLiana class="h-[200svh] absolute top-0" />
    <UIDecorationLiana class="h-[200svh] absolute top-0 right-0" />
    <UIDecorationLiana class="h-128 absolute top-0 right-32" />
    <UIDecorationLiana class="h-[175svh] absolute top-0 right-96" />
    <UIDecorationLiana class="h-96 absolute left-128 top-0" />
    <UIDecorationLiana class="h-256 inset-0 left-64 absolute" />
  </div>
</template>

<style>
  .divider {
    position: relative;
    background-image: url('/images/plane/grass_block.webp');
    height: 8rem;
    background-size: 8rem 8rem;
    background-repeat: repeat-x;
    box-shadow: 0 10px 50px 50px rgba(0, 0, 0, 0.5);
    z-index: 20;
    &:before {
      content: '';
      display: block;
      transform: translateY(-100%);
      height: 8rem;
      background-image: url('/images/plane/grass.webp');
      background-size: 8rem 8rem;
      background-repeat: repeat-x;
    }
  }
</style>
