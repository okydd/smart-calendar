import React, { createContext, useContext, useLayoutEffect, useState } from 'react';

export type ThemeMode = 'light' | 'dark' | 'auto';

/**
 * 主题开关已取消：产品决定只保留「常规（浅色）」主题。
 * ThemeProvider 现在恒为浅色，仅保留上下文供 Canvas 视图取用（getCanvasTheme('light')）。
 */
const KEY = 'calendarTheme';

interface ThemeCtxValue {
  mode: ThemeMode;
  resolved: 'light' | 'dark';
  setMode: (m: ThemeMode) => void;
}

const ThemeCtx = createContext<ThemeCtxValue>({
  mode: 'light',
  resolved: 'light',
  setMode: () => {}
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // 恒为浅色，忽略本地存储与系统设置
  const [mode] = useState<ThemeMode>('light');
  const resolved: 'light' | 'dark' = 'light';

  useLayoutEffect(() => {
    document.documentElement.dataset.theme = resolved;
    try {
      localStorage.removeItem(KEY);
    } catch {
      /* ignore */
    }
    window.dispatchEvent(new CustomEvent('themechange', { detail: resolved }));
  }, [resolved]);

  const setMode = (_m: ThemeMode) => {
    /* 主题切换已禁用 */
  };

  return <ThemeCtx.Provider value={{ mode, resolved, setMode }}>{children}</ThemeCtx.Provider>;
}

export function useTheme(): ThemeCtxValue {
  return useContext(ThemeCtx);
}

export function useResolvedTheme(): 'light' | 'dark' {
  return useContext(ThemeCtx).resolved;
}
