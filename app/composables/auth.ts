interface IUser {
  email: string;
  username: string;
}

import teleport from '~/assets/sfx/teleport.mp3';

export const useAuth = () => {
  const user = useState<IUser | null>('auth-user', () => null);
  const isLoading = useState<boolean>('auth-loading', () => false);
  const error = useState<string | null>('auth-error', () => null);
  const isModalOpen = useState<boolean>('auth-modal-open', () => false);

  const modalSfx = useSFX(teleport, { volume: 0.5 });

  const openModal = () => {
    isModalOpen.value = true;
    error.value = null;

    modalSfx.play();
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
      await new Promise((resolve) => setTimeout(resolve, 700));
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
      await new Promise((resolve) => setTimeout(resolve, 700));
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
