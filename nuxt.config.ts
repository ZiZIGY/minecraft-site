import Components from 'unplugin-vue-components/vite';
import MotionResolver from 'motion-v/resolver';
// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite';

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: {
    enabled: true,

    timeline: {
      enabled: true,
    },
  },
  modules: [
    '@vueuse/nuxt',
    'motion-v/nuxt',
    '@nuxt/icon',
    ['@nuxt/fonts', { families: [{ name: 'Minecraft', provider: 'local' }] }],
    '@nuxtjs/i18n',
    '@nuxt/image',
    '@nuxtjs/robots',
  ],
  css: ['~/assets/css/main.css'],
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
  },

  i18n: {
    strategy: 'no_prefix',
    defaultLocale: 'ru',

    locales: [
      { code: 'en', name: 'English', file: 'en.json' },
      { code: 'ru', name: 'Русский', file: 'ru.json' },
    ],
  },
  vite: {
    plugins: [
      tailwindcss(),
      Components({
        dts: true,
        resolvers: [MotionResolver()],
      }),
    ],
  },
});