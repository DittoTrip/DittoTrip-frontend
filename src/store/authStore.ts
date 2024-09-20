import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface StoreState {
  isLoggedIn: boolean;
  storeLogin: (accessToken: string, refreshToken: string) => void;
  storeLogout: () => void;
}

export const getAccessToken = () => {
  const accessToken = localStorage.getItem('accessToken');
  return accessToken;
};
export const getRefreshToken = () => {
  const accessToken = localStorage.getItem('accessToken');
  return accessToken;
};

export const setToken = (accessToken: string, refreshToken: string) => {
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
};

export const removeToken = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
};

export const useAuthStore = create<StoreState>()(
  persist(
    set => ({
      isLoggedIn: getAccessToken() ? true : false,
      storeLogin: (accessToken: string, refreshToken: string) => {
        set({ isLoggedIn: true });
        setToken(accessToken, refreshToken);
      },
      storeLogout: () => {
        set({ isLoggedIn: false });
        removeToken();
      },
    }),
    { name: 'ditto-storage' }
  )
);
