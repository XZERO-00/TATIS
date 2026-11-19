import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeState {
  theme: ThemeMode;
  resolvedTheme: 'light' | 'dark';
  setTheme: (theme: ThemeMode) => void;
  initTheme: () => void;
}

function getSystemTheme(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

function applyThemeToDOM(resolved: 'light' | 'dark') {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  if (resolved === 'dark') {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: 'system',
      resolvedTheme: 'light',
      setTheme: (theme: ThemeMode) => {
        const resolved = theme === 'system' ? getSystemTheme() : theme;
        applyThemeToDOM(resolved);
        set({ theme, resolvedTheme: resolved });
      },
      initTheme: () => {
        const currentTheme = get().theme;
        const resolved = currentTheme === 'system' ? getSystemTheme() : currentTheme;
        applyThemeToDOM(resolved);
        set({ resolvedTheme: resolved });

        if (typeof window !== 'undefined') {
          const media = window.matchMedia('(prefers-color-scheme: dark)');
          const listener = (e: MediaQueryListEvent) => {
            if (get().theme === 'system') {
              const newResolved = e.matches ? 'dark' : 'light';
              applyThemeToDOM(newResolved);
              set({ resolvedTheme: newResolved });
            }
          };
          media.addEventListener('change', listener);
        }
      },
    }),
    {
      name: 'tatis-theme-preference',
    }
  )
);
