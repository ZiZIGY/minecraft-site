<script lang="ts" setup></script>

<template>
  <div class="divider"> </div>
</template>

<style>
  .divider {
    position: relative;
    background-image: url('/images/plane/grass_block.webp');
    height: 8rem;
    background-size: 8rem 8rem;
    background-repeat: repeat-x;
    box-shadow: 0 10px 50px 50px rgba(0, 0, 0, 0.5);
    z-index: 10;
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
