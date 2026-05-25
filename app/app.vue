<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
  @keyframes portal-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @keyframes portal-out {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
  @keyframes page-hold {
  }

  .page-leave-active,
  .page-enter-active {
    animation: page-hold 0.4s;

    &::before {
      content: '';
      position: fixed;
      inset: 0;
      z-index: 50;
      background-image: url('/images/plane/portal.gif');
      background-size: 8rem;
      background-repeat: repeat;
    }
  }

  .page-leave-active::before {
    animation: portal-in 0.4s cubic-bezier(0.9, 0, 0.1, 1) forwards;
  }

  .page-enter-active::before {
    animation: portal-out 0.4s cubic-bezier(0.9, 0, 0.1, 1) forwards;
  }
</style>
