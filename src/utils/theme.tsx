import React, { createContext, useContext, useEffect, useLayoutEffect, useState } from 'react';

export type ThemeMode = 'light' | 'dark' | 'auto';

const KEY = 'calendarTheme';

function getSystemDark(): boolean {
  return (
    typeof window !== 'undefined' &&
    !!window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );
}

function readStored(): ThemeMode {
  try {
    const s = localStorage.getItem(KEY);
    if (s === 'light' || s === 'dark' || s === 'auto') return s;
  } catch {
    /* ignore */
  }
  return 'light';
}

export function resolveMode(mode: ThemeMode, systemDark: boolean): 'light' | 'dark' {
  if (mode === 'auto') return systemDark ? 'dark' : 'light';
  return mode;
}

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
  const [mode, setModeState] = useState<ThemeMode>(readStored);
  const [systemDark, setSystemDark] = useState<boolean>(getSystemDark);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => setSystemDark(mq.matches);
    if (mq.addEventListener) mq.addEventListener('change', handler);
    else if ((mq as MediaQueryList & { addListener?: (h: () => void) => void }).addListener)
      (mq as MediaQueryList & { addListener?: (h: () => void) => void }).addListener!(handler);
    return () => {
      if (mq.removeEventListener) mq.removeEventListener('change', handler);
      else if ((mq as MediaQueryList & { removeListener?: (h: () => void) => void }).removeListener)
        (mq as MediaQueryList & { removeListener?: (h: () => void) => void }).removeListener!(handler);
    };
  }, []);

  const resolved = resolveMode(mode, systemDark);

  useLayoutEffect(() => {
    document.documentElement.dataset.theme = resolved;
    try {
      localStorage.setItem(KEY, mode);
    } catch {
      /* ignore */
    }
    window.dispatchEvent(new CustomEvent('themechange', { detail: resolved }));
  }, [resolved, mode]);

  const setMode = (m: ThemeMode) => setModeState(m);

  return <ThemeCtx.Provider value={{ mode, resolved, setMode }}>{children}</ThemeCtx.Provider>;
}

export function useTheme(): ThemeCtxValue {
  return useContext(ThemeCtx);
}

export function useResolvedTheme(): 'light' | 'dark' {
  return useContext(ThemeCtx).resolved;
}
