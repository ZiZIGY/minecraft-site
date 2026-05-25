import { cva, type VariantProps } from 'class-variance-authority';

export const linkVariants = cva(
  [
    'font-minecraft inline-grid aspect-5/4',
    'bg-[url(/images/plane/hanging_sign.webp)] bg-no-repeat bg-size-[100%_100%]',
    'grid-rows-[33%_1fr_6%] items-center justify-items-center leading-none',
    "before:content-[''] after:content-['']",
    'select-none cursor-pointer transition-colors duration-150',
    'hover:text-white hover:text-shadow-mc',
    '[&.router-link-exact-active]:text-white [&.router-link-exact-active]:text-shadow-mc-active',
  ].join(' '),
  {
    variants: {
      size: {
        sm: 'text-xs  min-w-20',
        md: 'text-sm  min-w-30',
        lg: 'text-base min-w-40',
      },
      disabled: {
        true: 'opacity-50 cursor-not-allowed pointer-events-none',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

export type TLinkVariants = VariantProps<typeof linkVariants>;
