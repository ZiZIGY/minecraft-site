import { cva, type VariantProps } from 'class-variance-authority';

/** Shared base — horizontal face (::before) */
const pH = [
  "before:content-['']",
  'before:absolute',
  'before:left-0',
  'before:w-full',
  'before:h-10',
  'before:[background:inherit]',
  'before:pointer-events-none',
  'before:bg-size-[8rem_2.5rem]!',
].join(' ');

/** Shared base — vertical face (::after, always right) */
const pV = [
  "after:content-['']",
  'after:absolute',
  'after:top-0',
  'after:left-full',
  'after:w-10',
  'after:h-full',
  'after:[background:inherit]',
  'after:pointer-events-none',
  'after:bg-size-[2.5rem_8rem]!',
].join(' ');

/**
 *  top    — top face (skewed up-right)  + right face (leans up)
 *  bottom — bottom face (skewed down-right) + right face (leans down)
 *
 *  Proportions: 8rem bg tile · 2.5rem (h-10 / w-10) depth
 */
export const block3dVariants = cva('relative bg-size-[8rem] bg-repeat', {
  variants: {
    variant: {
      /** upper-right Minecraft perspective */
      top: [
        pH,
        'before:bottom-full before:origin-bottom-left before:[transform:skewX(-45deg)] before:[filter:brightness(1.25)]',
        pV,
        'after:origin-top-left after:[transform:skewY(-45deg)] after:[filter:brightness(0.55)]',
      ].join(' '),

      /** lower-right / floor perspective */
      bottom: [
        pH,
        'before:top-full before:origin-top-left before:[transform:skewX(45deg)] before:[filter:brightness(0.55)]',
        pV,
        'after:origin-top-left after:[transform:skewY(45deg)] after:[filter:brightness(0.55)]',
      ].join(' '),
    },
  },
  defaultVariants: {
    variant: 'top',
  },
});

export type TBlock3DVariants = VariantProps<typeof block3dVariants>;
