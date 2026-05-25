<script lang="ts" setup>
  /**
   * UIDecorationBlock3D
   *
   * Wraps any rectangle (square, wide strip, anything) in a pseudo-3D block:
   *   ::before — top face,  ::after — right face.
   *
   * Set the texture with ordinary Tailwind / CSS classes on the component:
   *   class="bg-[url(/images/plane/stone.webp)] bg-size-[8rem] bg-repeat"
   *
   * Both pseudo-elements pick up the background via `background: inherit` —
   * no texture props needed.
   *
   * Depth (CSS variable --b3d-depth, default 2.5rem):
   *   style="--b3d-depth: 4rem"     <- inline
   *   class="[--b3d-depth:3rem]"    <- Tailwind arbitrary
   *
   * Face brightness (optional overrides):
   *   --b3d-top-light   (default 1.25)
   *   --b3d-side-light  (default 0.55)
   */
  defineOptions({ inheritAttrs: false });
</script>

<template>
  <div class="b3d" v-bind="$attrs">
    <slot />
  </div>
</template>

<style scoped>
  .b3d {
    position: relative;
  }

  /* ── top face ────────────────────────────────────────────────────────────
     bottom:100% places it flush above the element.
     skewX(-45deg) from bottom-left origin:
       bottom edge  = top edge of element  (unchanged)
       top edge     shifted right by --b3d-depth
  ─────────────────────────────────────────────────────────────────────── */
  .b3d::before {
    content: '';
    position: absolute;
    left: 0;
    bottom: 100%;
    width: 100%;
    height: var(--b3d-depth, 2.5rem);
    background: inherit;
    transform-origin: bottom left;
    transform: skewX(-45deg);
    filter: brightness(var(--b3d-top-light, 1.25));
    pointer-events: none;
  }

  /* ── right face ──────────────────────────────────────────────────────────
     left:100% places it flush right of the element.
     skewY(-45deg) from top-left origin:
       left edge    = right edge of element  (unchanged)
       top-right corner shifts UP by --b3d-depth — joins ::before corner. ✓
  ─────────────────────────────────────────────────────────────────────── */
  .b3d::after {
    content: '';
    position: absolute;
    top: 0;
    left: 100%;
    width: var(--b3d-depth, 2.5rem);
    height: 100%;
    background: inherit;
    transform-origin: top left;
    transform: skewY(-45deg);
    filter: brightness(var(--b3d-side-light, 0.55));
    pointer-events: none;
  }
</style>
