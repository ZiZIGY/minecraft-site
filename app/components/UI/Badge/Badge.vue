<script lang="ts" setup>
  import { cva, type VariantProps } from 'class-variance-authority';

  const badgeVariants = cva(
    'inline-flex items-center font-minecraft text-xs border px-2 py-0.5 leading-none select-none',
    {
      variants: {
        variant: {
          teal:   'text-mc-teal border-mc-teal/40 bg-mc-teal/10',
          purple: 'text-mc-purple-light border-mc-purple/40 bg-mc-purple/10',
          gold:   'text-mc-gold border-mc-gold-dark/40 bg-mc-gold/10',
          green:  'text-mc-green border-mc-green/40 bg-mc-green/10',
        },
      },
      defaultVariants: { variant: 'green' },
    }
  );

  type TBadgeVariants = VariantProps<typeof badgeVariants>;

  const props = defineProps<{
    variant?: TBadgeVariants['variant'];
  }>();
</script>

<template>
  <span :class="cn(badgeVariants({ variant: props.variant }), $attrs.class)">
    <slot />
  </span>
</template>
