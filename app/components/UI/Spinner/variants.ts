import { cva, type VariantProps } from 'class-variance-authority';

export const spinnerVariants = cva('spinner', {
  variants: {
    size: {
      sm: '',
      md: '',
      lg: '',
    },
  },
  defaultVariants: { size: 'md' },
});

export type TSpinnerVariants = VariantProps<typeof spinnerVariants>;
