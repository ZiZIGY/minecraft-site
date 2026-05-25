<script lang="ts" setup>
  import { motion } from 'motion-v';

  type TCategory = 'update' | 'event' | 'maintenance' | 'news';

  interface INewsItem {
    category: TCategory;
    date: string;
    title: string;
    description: string;
    image?: string;
  }

  const CATEGORY_LABELS: Record<TCategory, string> = {
    update: 'Обновление',
    event: 'Ивент',
    maintenance: 'Работы',
    news: 'Новость',
  };

  const CATEGORY_BADGE = {
    update:      'teal',
    event:       'purple',
    maintenance: 'gold',
    news:        'green',
  } as const;

  const NEWS: INewsItem[] = [
    {
      category: 'update',
      date: '20 мая 2025',
      title: 'Глобальное обновление 2.0',
      description:
        'Новые биомы, полностью переработанная генерация мира и более 50 новых предметов. Заходи и исследуй!',
      image: '/images/plane/liana.webp',
    },
    {
      category: 'event',
      date: '15 мая 2025',
      title: 'Строительный конкурс',
      description:
        'Участвуй в майском билд-конкурсе! Лучшие постройки получат эксклюзивный ник-цвет и внутриигровую валюту.',
      image: '/images/plane/oak_log.webp',
    },
    {
      category: 'news',
      date: '10 мая 2025',
      title: 'Топ игроков апреля',
      description:
        'Объявляем победителей рейтинга за апрель. ChokerWithA.45 снова занял первое место по набитым мобам!',
    },
    {
      category: 'maintenance',
      date: '5 мая 2025',
      title: 'Технические работы',
      description:
        'Плановое обслуживание серверов 7 мая с 03:00 до 06:00 МСК. Сохраните прогресс заранее.',
      image: '',
    },
    {
      category: 'event',
      date: '1 мая 2025',
      title: 'Первомайский ивент',
      description:
        'Весенний ивент с уникальными наградами, квестами и временным боссом. Только 72 часа!',
      image: '/images/plane/grass.webp',
    },
    {
      category: 'update',
      date: '24 апреля 2025',
      title: 'Патч 1.9.4 — фиксы',
      description:
        'Исправлены критические баги с дюпом предметов, оптимизирована загрузка чанков, улучшена античит-система.',
    },
  ];
</script>

<template>
  <div
    class="relative py-32 min-h-svh flex items-center bg-[url(/images/plane/stone.webp)] bg-size-[8rem] bg-repeat z-0"
  >
    <!-- контент -->
    <motion.div
      class="relative z-10 container mx-auto px-4 w-full"
      :initial="{ opacity: 0, y: 24 }"
      :whileInView="{ opacity: 1, y: 0 }"
      :viewport="{ once: true, margin: '-40px' }"
      :transition="{
        type: 'spring' as const,
        stiffness: 160,
        damping: 22,
        delay: 0.1,
      }"
    >
      <UIPanel>
        <template #header>
          <div class="flex flex-col gap-2">
            <UIParticleText
              class="font-minecraft text-5xl text-mc-green text-shadow-mc leading-none w-min"
            >
              Новости
            </UIParticleText>
            <p class="font-minecraft text-white/75 text-base text-shadow-mc">
              Последние события на сервере
            </p>
          </div>
        </template>

        <!-- слайдер -->
        <UISlider
          :options="{
            align: 'start',
            loop: false,
            containScroll: 'trimSnaps',
          }"
        >
          <!-- кнопки по бокам + контент -->
          <div class="flex items-stretch gap-3">
            <UISliderButton
              direction="prev"
              class="shrink-0 self-center"
            />

            <UISliderContent
              class="flex-1 min-w-0"
              container-class="gap-6"
            >
              <UISliderItem
                v-for="(item, i) in NEWS"
                :key="i"
                class="basis-full shrink-0"
              >
                <!-- карточка: телефон — картинка сверху; десктоп — картинка сбоку -->
                <motion.div
                  class="news-card flex flex-col md:flex-row flex-1"
                  :initial="{ opacity: 0, y: 20 }"
                  :whileInView="{ opacity: 1, y: 0 }"
                  :viewport="{ once: true }"
                  :transition="{
                    type: 'spring' as const,
                    stiffness: 200,
                    damping: 24,
                    delay: (i % 3) * 0.08,
                  }"
                >
                  <!-- изображение / заглушка -->
                  <div class="news-card__image w-full h-64 md:w-1/3 md:h-auto relative overflow-hidden shrink-0">
                    <img
                      v-if="item.image"
                      :src="item.image"
                      class="absolute inset-0 w-full h-full object-cover brightness-75"
                      draggable="false"
                    />
                    <div
                      v-else
                      class="absolute inset-0 flex flex-col items-center justify-center gap-2 opacity-30"
                    >
                      <Icon name="mdi:image-outline" class="size-16 text-white" />
                      <span class="font-minecraft text-xs text-white">Нет изображения</span>
                    </div>
                  </div>

                  <!-- контент -->
                  <div class="flex flex-col gap-4 p-6 flex-1">
                    <!-- мета -->
                    <div class="flex items-center gap-3">
                      <UIBadge :variant="CATEGORY_BADGE[item.category]">
                        {{ CATEGORY_LABELS[item.category] }}
                      </UIBadge>
                      <span class="font-minecraft text-xs text-white/40 text-shadow-mc">
                        {{ item.date }}
                      </span>
                    </div>

                    <!-- текст -->
                    <div class="flex flex-col gap-2 flex-1">
                      <h3 class="font-minecraft text-xl text-white text-shadow-mc leading-snug">
                        {{ item.title }}
                      </h3>
                      <p class="font-minecraft text-sm text-white/65 leading-relaxed">
                        {{ item.description }}
                      </p>
                    </div>

                    <!-- кнопка -->
                    <button
                      type="button"
                      class="font-minecraft text-sm text-mc-teal text-shadow-mc self-start hover:text-mc-teal-light transition-colors cursor-pointer mt-auto"
                    >
                      Подробнее →
                    </button>
                  </div>
                </motion.div>
              </UISliderItem>
            </UISliderContent>

            <UISliderButton
              direction="next"
              class="shrink-0 self-center"
            />
          </div>

          <!-- точки-индикаторы -->
          <UISliderDots class="mt-5" />
        </UISlider>

        <template #footer />
      </UIPanel>
    </motion.div>
  </div>
</template>

<style scoped>
  .news-card {
    background: linear-gradient(
      145deg,
      rgba(0, 0, 0, 0.72),
      rgba(10, 10, 10, 0.85)
    );
    box-shadow:
      0 4px 24px rgba(0, 0, 0, 0.6),
      inset 0 1px 0 rgba(255, 255, 255, 0.04);

    &__image {
      background:
        url('/images/plane/stone.webp') 4rem 4rem repeat,
        linear-gradient(160deg, #1a1a1a, #0d0d0d);
      border-right: 2px solid rgba(255, 255, 255, 0.04);
    }
  }
</style>
