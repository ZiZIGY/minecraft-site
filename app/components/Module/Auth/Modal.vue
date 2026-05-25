<script lang="ts" setup>
  import { motion, AnimatePresence } from 'motion-v';

  const { isModalOpen, isLoading, error, login, register } = useAuth();

  type TTab = 'login' | 'register';
  const activeTab = ref<TTab>('login');
  const dir = ref(1); // 1 = вперёд (→), -1 = назад (←)

  // Поля входа
  const loginEmail = ref('');
  const loginPassword = ref('');

  // Поля регистрации
  const regUsername = ref('');
  const regEmail = ref('');
  const regPassword = ref('');
  const regConfirmPassword = ref('');

  function setTab(tab: TTab) {
    if (tab === activeTab.value) return;
    dir.value = tab === 'register' ? 1 : -1;
    activeTab.value = tab;
    error.value = null;
  }

  async function onSubmit() {
    if (activeTab.value === 'login') {
      await login(loginEmail.value, loginPassword.value);
    } else {
      await register(
        regUsername.value,
        regEmail.value,
        regPassword.value,
        regConfirmPassword.value
      );
    }
  }

  // Сброс при закрытии
  watch(isModalOpen, (open) => {
    if (!open) {
      activeTab.value = 'login';
      loginEmail.value = '';
      loginPassword.value = '';
      regUsername.value = '';
      regEmail.value = '';
      regPassword.value = '';
      regConfirmPassword.value = '';
    }
  });

  const spring = { type: 'spring' as const, stiffness: 320, damping: 28 };
</script>

<template>
  <UIModal v-model="isModalOpen">
    <!-- Инвентарные табы над панелью -->
    <template #tabs>
      <button
        class="inv-tab"
        :class="activeTab === 'login' ? 'inv-tab--active' : 'inv-tab--inactive'"
        type="button"
        @click="setTab('login')"
      >
        {{ $t('auth.title_login') }}
      </button>
      <button
        class="inv-tab"
        :class="
          activeTab === 'register' ? 'inv-tab--active' : 'inv-tab--inactive'
        "
        type="button"
        @click="setTab('register')"
      >
        {{ $t('auth.title_register') }}
      </button>
    </template>

    <!-- Слайдирующий контент -->
    <div class="relative overflow-hidden">
      <AnimatePresence>
        <!-- Вход -->
        <motion.div
          v-if="activeTab === 'login'"
          key="login"
          :initial="{ x: `${dir * 100}%`, opacity: 0 }"
          :animate="{ x: '0%', opacity: 1 }"
          :exit="{
            x: `${-dir * 100}%`,
            opacity: 0,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
          }"
          :transition="spring"
        >
          <form
            class="flex flex-col gap-3"
            @submit.prevent="onSubmit"
          >
            <div class="flex flex-col gap-1.5">
              <label
                class="font-minecraft text-xs text-[#404040] text-shadow-none leading-none"
              >
                {{ $t('auth.email') }}
              </label>
              <UIInput
                v-model="loginEmail"
                type="email"
                placeholder="example@gmail.com"
                :disabled="isLoading"
                autocomplete="email"
              />
            </div>

            <div class="flex flex-col gap-1.5">
              <label
                class="font-minecraft text-xs text-[#404040] text-shadow-none leading-none"
              >
                {{ $t('auth.password') }}
              </label>
              <UIInput
                v-model="loginPassword"
                type="password"
                :placeholder="$t('auth.password_placeholder')"
                :disabled="isLoading"
                autocomplete="current-password"
              />
            </div>

            <p
              v-if="error"
              class="font-minecraft text-xs text-mc-red text-shadow-none leading-snug"
            >
              {{ error }}
            </p>

            <UIButton
              type="submit"
              size="md"
              :disabled="isLoading"
              class="w-full mt-1"
            >
              <span
                v-if="isLoading"
                class="flex items-center gap-2"
              >
                <UISpinner size="sm" />
                {{ $t('auth.loading') }}
              </span>
              <span v-else>{{ $t('auth.submit') }}</span>
            </UIButton>
          </form>
        </motion.div>

        <!-- Регистрация -->
        <motion.div
          v-else
          key="register"
          :initial="{ x: `${dir * 100}%`, opacity: 0 }"
          :animate="{ x: '0%', opacity: 1 }"
          :exit="{
            x: `${-dir * 100}%`,
            opacity: 0,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
          }"
          :transition="spring"
        >
          <form
            class="flex flex-col gap-3"
            @submit.prevent="onSubmit"
          >
            <div class="flex flex-col gap-1.5">
              <label
                class="font-minecraft text-xs text-[#404040] text-shadow-none leading-none"
              >
                {{ $t('auth.username') }}
              </label>
              <UIInput
                v-model="regUsername"
                type="text"
                :placeholder="$t('auth.username_placeholder')"
                :disabled="isLoading"
                autocomplete="username"
              />
            </div>

            <div class="flex flex-col gap-1.5">
              <label
                class="font-minecraft text-xs text-[#404040] text-shadow-none leading-none"
              >
                {{ $t('auth.email') }}
              </label>
              <UIInput
                v-model="regEmail"
                type="email"
                placeholder="example@gmail.com"
                :disabled="isLoading"
                autocomplete="email"
              />
            </div>

            <div class="flex flex-col gap-1.5">
              <label
                class="font-minecraft text-xs text-[#404040] text-shadow-none leading-none"
              >
                {{ $t('auth.password') }}
              </label>
              <UIInput
                v-model="regPassword"
                type="password"
                :placeholder="$t('auth.password_placeholder')"
                :disabled="isLoading"
                autocomplete="new-password"
              />
            </div>

            <div class="flex flex-col gap-1.5">
              <label
                class="font-minecraft text-xs text-[#404040] text-shadow-none leading-none"
              >
                {{ $t('auth.confirm_password') }}
              </label>
              <UIInput
                v-model="regConfirmPassword"
                type="password"
                :placeholder="$t('auth.password_placeholder')"
                :disabled="isLoading"
                autocomplete="new-password"
              />
            </div>

            <p
              v-if="error"
              class="font-minecraft text-xs text-mc-red text-shadow-none leading-snug"
            >
              {{ error }}
            </p>

            <UIButton
              type="submit"
              size="md"
              :disabled="isLoading"
              class="w-full mt-1"
            >
              <span
                v-if="isLoading"
                class="flex items-center gap-2"
              >
                <UISpinner size="sm" />
                {{ $t('auth.loading') }}
              </span>
              <span v-else>{{ $t('auth.register') }}</span>
            </UIButton>
          </form>
        </motion.div>
      </AnimatePresence>
    </div>
  </UIModal>
</template>

<style scoped>
  /* Minecraft inventory tab */
  .inv-tab {
    position: relative;
    padding: 6px 12px;
    z-index: 1;
    background: var(--color-modal);
    border-top: 3px solid #ffffff;
    border-left: 3px solid #ffffff;
    border-right: 3px solid #555555;
    border-bottom: 3px solid #555555;
    font-family: var(--font-minecraft);
    font-size: 11px;
    color: #404040;
    cursor: pointer;
    white-space: nowrap;
    margin-bottom: -3px;
    border-radius: 4px 4px 0 0;
  }

  .inv-tab--active {
    z-index: 3; /* поверх панели (z-2) */
    border-bottom-color: var(--color-modal);
  }

  /* Неактивный таб — уходит ЗА панель */
  .inv-tab--inactive {
    z-index: 1; /* ниже панели (z-2) — панель его перекрывает снизу */
    margin-top: 3px;
    filter: brightness(0.82);

    &:hover {
      filter: brightness(0.92);
    }
  }
</style>
