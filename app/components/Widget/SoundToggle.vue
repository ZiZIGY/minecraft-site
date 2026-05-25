<script lang="ts" setup>
  import levelUp from '~/assets/sfx/level_up.mp3';

  const { isMuted, toggleMute } = useSFXMuted();

  const sfx = useSFX(levelUp, { volume: 0.4, interrupt: true });

  function toggle() {
    toggleMute();
    if (!isMuted.value) sfx.play();
  }
</script>

<template>
  <button
    class="flex items-center gap-2 font-minecraft text-white text-sm hover:text-mc-teal transition-colors duration-150 cursor-pointer select-none"
    :aria-label="isMuted ? 'Включить звук' : 'Выключить звук'"
    @click="toggle"
  >
    <Icon
      :name="isMuted ? 'lucide:volume-x' : 'lucide:volume-2'"
      :class="['size-4 shrink-0', isMuted ? 'text-red-400' : '']"
    />
  </button>
</template>
