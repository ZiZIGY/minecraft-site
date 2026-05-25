<script lang="ts" setup>
  const { user, openModal, logout } = useAuth();
</script>

<template>
  <div class="flex items-center gap-3">
    <template v-if="user">
      <UIFrame class="shrink-0" />
      <span
        class="font-minecraft text-sm text-white leading-none text-shadow-mc"
      >
        {{ user.username }}
      </span>
      <button
        class="font-minecraft text-xs text-white/50 hover:text-mc-red transition-colors duration-150 cursor-pointer leading-none"
        :aria-label="$t('auth.logout')"
        @click="logout"
      >
        <Icon
          name="lucide:log-out"
          class="size-4"
        />
      </button>
    </template>

    <template v-else>
      <button
        class="flex items-center gap-2 font-minecraft text-sm text-white hover:text-mc-teal transition-colors duration-150 cursor-pointer select-none"
        @click="openModal"
      >
        <UIFrame class="shrink-0" />
        <span class="leading-none text-shadow-mc">
          {{ $t('auth.title_login') }} | {{ $t('auth.title_register') }}
        </span>
      </button>
    </template>

    <ModuleAuthModal />
  </div>
</template>
