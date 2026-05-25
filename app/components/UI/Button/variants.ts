import { cva, type VariantProps } from 'class-variance-authority';

const BEVEL = [
  '[border-top:2px_solid_rgba(255,255,255,0.3)]',
  '[border-left:2px_solid_rgba(255,255,255,0.3)]',
  '[border-bottom:2px_solid_rgba(0,0,0,0.4)]',
  '[border-right:2px_solid_rgba(0,0,0,0.4)]',
  'active:[border-top:2px_solid_rgba(0,0,0,0.35)]',
  'active:[border-left:2px_solid_rgba(0,0,0,0.35)]',
  'active:[border-bottom:2px_solid_rgba(255,255,255,0.25)]',
  'active:[border-right:2px_solid_rgba(255,255,255,0.25)]',
].join(' ');

/**
 * Tailwind v4: --color-btn-stone в @theme → утилита bg-btn-stone.
 * Hover/active через brightness — scannable, не конфликтует с disabled filter.
 */
function makeVariant(bgClass: string) {
  return [
    `${bgClass} text-white [text-shadow:var(--text-shadow-mc)]`,
    'hover:enabled:brightness-125',
    'active:brightness-75',
    BEVEL,
  ].join(' ');
}

export const buttonVariants = cva(
  [
    'relative inline-flex items-center justify-center',
    'font-minecraft leading-none select-none cursor-pointer',
    'transition-[filter,transform] duration-75',
    'outline outline-2 outline-black outline-offset-0',
    'active:translate-y-px',
  ].join(' '),
  {
    variants: {
      variant: {
        default: makeVariant('bg-btn-stone'),
        primary: makeVariant('bg-btn-grass'),
        danger:  makeVariant('bg-btn-lava'),
      },

      size: {
        sm:   'px-4 py-1.5 text-xs',
        md:   'px-6 py-2.5 text-sm',
        lg:   'px-8 py-3.5 text-base',
        icon: 'size-10 p-1',
      },

      disabled: {
        true: '[filter:saturate(0)_brightness(0.6)] cursor-not-allowed pointer-events-none',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

export type TButtonVariants = VariantProps<typeof buttonVariants>;
