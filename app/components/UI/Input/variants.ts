import { cva, type VariantProps } from 'class-variance-authority';

export const inputVariants = cva(
  [
    // base
    'w-full font-minecraft leading-none text-white',
    'bg-input',
    // Minecraft inset bevel — тёмный верх/лево (утоплено), светлый низ/право
    '[border-top:2px_solid_#373737]',
    '[border-left:2px_solid_#373737]',
    '[border-bottom:2px_solid_#ffffff]',
    '[border-right:2px_solid_#ffffff]',
    // placeholder
    'placeholder:text-white/35 placeholder:font-minecraft',
    // focus — teal ring поверх outline
    'focus-visible:outline-none',
    'focus-visible:[box-shadow:0_0_0_2px_black,0_0_0_4px_var(--color-mc-teal)]',
    // transition
    'transition-shadow duration-150',
  ].join(' '),
  {
    variants: {
      size: {
        sm: 'px-3 py-1.5 text-xs',
        md: 'px-4 py-2.5 text-sm',
        lg: 'px-5 py-3.5 text-base',
      },
      disabled: {
        true: '[filter:saturate(0)_brightness(0.6)] cursor-not-allowed pointer-events-none',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

export type TInputVariants = VariantProps<typeof inputVariants>;
