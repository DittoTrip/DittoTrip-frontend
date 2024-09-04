import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface StoreState {
  isLoggedIn: boolean;
  storeLogin: (token: string) => void;
  storeLogout: () => void;
}

export const getToken = () => {
  const token = localStorage.getItem('token');
  console.log(token);
  return token;
};

export const setToken = (token: string) => {
  localStorage.setItem('token', token);
};

export const removeToken = () => {
  localStorage.removeItem('token');
};

export const useAuthStore = create<StoreState>()(
  persist(
    set => ({
      isLoggedIn: getToken() ? true : false,
      storeLogin: (token: string) => {
        set({ isLoggedIn: true });
        setToken(token);
      },
      storeLogout: () => {
        set({ isLoggedIn: false });
        removeToken();
      },
    }),
    { name: 'ditto-storage' }
  )
);
