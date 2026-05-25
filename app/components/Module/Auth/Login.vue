<script lang="ts" setup>
  const { isLoading, error, login } = useAuth();

  const email    = ref('');
  const password = ref('');

  async function onSubmit() {
    await login(email.value, password.value);
  }
</script>

<template>
  <form class="flex flex-col gap-3" @submit.prevent="onSubmit">
    <div class="flex flex-col gap-1.5">
      <label class="font-minecraft text-xs text-[#404040] text-shadow-none leading-none">
        {{ $t('auth.email') }}
      </label>
      <UIInput
        v-model="email"
        type="email"
        placeholder="example@gmail.com"
        :disabled="isLoading"
        autocomplete="email"
      />
    </div>

    <div class="flex flex-col gap-1.5">
      <label class="font-minecraft text-xs text-[#404040] text-shadow-none leading-none">
        {{ $t('auth.password') }}
      </label>
      <UIInput
        v-model="password"
        type="password"
        :placeholder="$t('auth.password_placeholder')"
        :disabled="isLoading"
        autocomplete="current-password"
      />
    </div>

    <p v-if="error" class="font-minecraft text-xs text-mc-red text-shadow-none leading-snug">
      {{ error }}
    </p>

    <UIButton type="submit" variant="primary" size="md" :disabled="isLoading" class="w-full mt-1">
      <span v-if="isLoading" class="flex items-center gap-2">
        <UISpinner size="sm" />
        {{ $t('auth.loading') }}
      </span>
      <span v-else>{{ $t('auth.submit') }}</span>
    </UIButton>
  </form>
</template>
