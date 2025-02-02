import create from 'zustand';

const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: true, // For demo purposes, set to true
  token: null,
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  setToken: (token) => set({ token }),
  logout: () => set({ user: null, isAuthenticated: false, token: null }),
  // Initialize with demo user
  init: () => set({
    user: {
      id: '1',
      name: 'Test User',
      email: 'test@example.com',
      username: 'testuser',
      avatar: null
    },
    isAuthenticated: true
  })
}));

// Initialize the store with demo data
useAuthStore.getState().init();

export default useAuthStore;
