import { cva, type VariantProps } from 'class-variance-authority';

export const frameVariants = cva(
  'bg-[url(/images/plane/frame.jpg)] bg-no-repeat bg-size-[100%_100%] flex items-center justify-center aspect-square shrink-0',
  {
    variants: {
      size: {
        xs: 'size-10',
        sm: 'size-14',
        md: 'size-20',
        lg: 'size-28',
        xl: 'size-36',
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

export type TFrameVariants = VariantProps<typeof frameVariants>;
