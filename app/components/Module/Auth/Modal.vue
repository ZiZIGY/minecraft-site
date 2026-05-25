<script lang="ts" setup>
  const { isModalOpen, error } = useAuth();

  const activeTab = ref('login');

  watch(isModalOpen, (open) => {
    if (!open) {
      activeTab.value = 'login';
      error.value = null;
    }
  });
</script>

<template>
  <UITabs v-model="activeTab">
    <UIModal v-model="isModalOpen">
      <template #tabs>
        <UITabsList class="flex justify-center w-full gap-0.75">
          <UITabsItem value="login">
            {{ $t('auth.title_login') }}
          </UITabsItem>
          <UITabsItem value="register">
            {{ $t('auth.title_register') }}
          </UITabsItem>
        </UITabsList>
      </template>

      <UITabsPanels>
        <UITabsPanel value="login">
          <ModuleAuthLogin />
        </UITabsPanel>
        <UITabsPanel value="register">
          <ModuleAuthRegister />
        </UITabsPanel>
      </UITabsPanels>
    </UIModal>
  </UITabs>
</template>
