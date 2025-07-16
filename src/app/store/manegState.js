import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuth = create(
  persist(
    (set) => ({
      User: null,
      users: null,
      isAuthnticated: false,
      posts: null, // ✅ إضافة posts
      setUser:(userData) => set({User:userData}),

      log_in: (UserData, clintes) =>
        set({
          User: UserData,
          isAuthnticated: true,
          users: clintes,
        }),

      LogOut: () =>
        set({
          User: null,
          isAuthnticated: false,
          posts: null,
          
        }),

      setPosts: (postsData) =>
        set({
          posts: postsData,
        }),
          updateUser: (updatedData) => set(state => ({
            User: { ...state.User, ...updatedData }
        }))

    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        User: state.User,
        isAuthnticated: state.isAuthnticated,
        users: state.users,
        posts: state.posts, // ✅ نحفظ البوستات أيضًا
      }),
    }
  )
);



export const useTheme = create(
  persist(
    (set) => ({
      theme: 'light',
      themeColor: '#145cc0', // ← اللون الأساسي الافتراضي (أزرق مثلاً)

      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === 'light' ? 'dark' : 'light',
        })),

      setThemeColor: (color) =>
        set(() => ({
          themeColor: color,
        })),
    }),
    {
      name: 'theme-storage',
      partialize: (state) => ({
        theme: state.theme,
        themeColor: state.themeColor,
      }),
    }
  )
);
