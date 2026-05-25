<script lang="ts" setup>
  import { motion, AnimatePresence } from 'motion-v';

  interface IModalProps {
    title?: string;
  }

  defineProps<IModalProps>();

  const open = defineModel<boolean>({ default: false });

  const spring = { type: 'spring' as const, stiffness: 320, damping: 26 };

  const close = () => (open.value = false);

  onMounted(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKey);
    onUnmounted(() => window.removeEventListener('keydown', onKey));
  });
</script>

<template>
  <Teleport to="body">
    <AnimatePresence>
      <div
        v-if="open"
        class="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center"
      >
        <!-- backdrop -->
        <motion.div
          class="absolute inset-0 bg-black/70"
          :initial="{ opacity: 0 }"
          :animate="{ opacity: 1 }"
          :exit="{ opacity: 0 }"
          :transition="{ duration: 0.15 }"
          @click="close"
        />

        <!-- обёртка анимации (без стилей панели) -->
        <motion.div
          class="relative z-10 flex flex-col min-w-80 max-w-lg w-full"
          :initial="{ opacity: 0, scale: 0.88, y: -12 }"
          :animate="{ opacity: 1, scale: 1, y: 0 }"
          :exit="{ opacity: 0, scale: 0.88, y: -12 }"
          :transition="spring"
          role="dialog"
          aria-modal="true"
        >
          <!-- Tabs above panel (optional) -->
          <div
            v-if="$slots.tabs"
            class="flex items-end gap-1 px-2"
          >
            <slot name="tabs" />
          </div>

          <!-- Панель -->
          <div class="modal-panel flex flex-col max-h-[85vh] rounded">
            <!-- заголовок -->
            <div
              v-if="title || $slots.header"
              class="modal-header flex items-center justify-between px-4 py-3 shrink-0"
            >
              <slot name="header">
                <span
                  class="font-minecraft text-sm text-[#404040] text-shadow-none leading-none"
                >
                  {{ title }}
                </span>
              </slot>

              <button
                type="button"
                class="modal-close size-5 flex items-center justify-center font-minecraft text-xs text-[#404040] hover:brightness-125 transition-[filter] cursor-pointer"
                aria-label="Закрыть"
                @click="close"
              >
                ✕
              </button>
            </div>

            <!-- контент -->
            <div class="overflow-y-auto flex-1 p-4">
              <slot />
            </div>

            <!-- футер -->
            <div
              v-if="$slots.footer"
              class="modal-footer px-4 py-3 shrink-0"
            >
              <slot name="footer" />
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  </Teleport>
</template>

<style scoped>
  .modal-panel {
    position: relative;
    z-index: 2;
    background: var(--color-modal);
    outline: 2px solid black;
    border-top: 3px solid #ffffff;
    border-left: 3px solid #ffffff;
    border-bottom: 3px solid #555555;
    border-right: 3px solid #555555;
  }

  .modal-header {
    border-bottom: 2px solid #555555;
    box-shadow: 0 1px 0 #ffffff;
  }

  .modal-footer {
    border-top: 2px solid #555555;
    box-shadow: 0 -1px 0 #ffffff inset;
  }

  .modal-close {
    outline: 2px solid black;
    background: #c6c6c6;
    border-top: 2px solid #ffffff;
    border-left: 2px solid #ffffff;
    border-bottom: 2px solid #555555;
    border-right: 2px solid #555555;

    &:active {
      border-top: 2px solid #555555;
      border-left: 2px solid #555555;
      border-bottom: 2px solid #ffffff;
      border-right: 2px solid #ffffff;
    }
  }
</style>
