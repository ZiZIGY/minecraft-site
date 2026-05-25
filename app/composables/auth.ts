interface IUser {
  email: string;
  username: string;
}

const user = ref<IUser | null>(null);
const isLoading = ref(false);
const error = ref<string | null>(null);
const isModalOpen = ref(false);

export const useAuth = () => {
  const openModal = () => {
    isModalOpen.value = true;
    error.value = null;
  };
  const closeModal = () => {
    isModalOpen.value = false;
    error.value = null;
  };

  const login = async (email: string, password: string) => {
    if (!email || !password) {
      error.value = 'Заполните все поля';
      return;
    }

    isLoading.value = true;
    error.value = null;
    try {
      // TODO: реальный API
      await new Promise((r) => setTimeout(r, 700));
      user.value = { email, username: email.split('@')[0]! };
      closeModal();
    } catch {
      error.value = 'Неверный логин или пароль';
    } finally {
      isLoading.value = false;
    }
  };

  const register = async (
    username: string,
    email: string,
    password: string,
    confirmPassword: string
  ) => {
    if (!username || !email || !password || !confirmPassword) {
      error.value = 'Заполните все поля';
      return;
    }
    if (password !== confirmPassword) {
      error.value = 'Пароли не совпадают';
      return;
    }

    isLoading.value = true;
    error.value = null;
    try {
      // TODO: реальный API
      await new Promise((r) => setTimeout(r, 700));
      user.value = { email, username };
      closeModal();
    } catch {
      error.value = 'Ошибка регистрации';
    } finally {
      isLoading.value = false;
    }
  };

  const logout = () => {
    user.value = null;
  };

  return {
    user,
    isLoading,
    error,
    isModalOpen,
    openModal,
    closeModal,
    login,
    register,
    logout,
  };
};
