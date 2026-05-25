<script lang="ts" setup>
  import xp from '/assets/sfx/xp.mp3';
  const { locale, setLocale } = useI18n();

  const xpSfx = useSFX(xp, { volume: 0.4, interrupt: true });

  const LOCALES = [
    { code: 'ru', label: 'RU' },
    { code: 'en', label: 'EN' },
  ] as const;

  const current = computed(() => LOCALES.find((l) => l.code === locale.value)!);
  const next = computed(() => LOCALES.find((l) => l.code !== locale.value)!);

  function toggle() {
    xpSfx.play();
    setLocale(next.value.code);
  }
</script>

<template>
  <button
    class="flex items-center gap-2 font-minecraft text-white text-sm hover:text-mc-teal transition-colors duration-150 cursor-pointer select-none"
    @click="toggle"
  >
    <Icon
      name="lucide:globe"
      class="size-4 shrink-0"
    />
    <span>{{ current.label }}</span>
  </button>
</template>
