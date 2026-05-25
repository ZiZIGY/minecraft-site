import type { InjectionKey, Ref } from 'vue';

import type { EmblaCarouselType } from 'embla-carousel';

export interface ISliderContext {
  emblaRef: Ref<HTMLElement | undefined>;
  emblaApi: Ref<EmblaCarouselType | undefined>;
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: Ref<boolean>;
  canScrollNext: Ref<boolean>;
}

export const SLIDER_KEY: InjectionKey<ISliderContext> = Symbol('Slider');

export function useSliderContext(): ISliderContext {
  const ctx = inject(SLIDER_KEY);
  if (!ctx)
    throw new Error('[Slider] Компонент должен использоваться внутри <Slider>');
  return ctx;
}
