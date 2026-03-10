"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";

type ThemeMode = "light" | "dark";

interface ThemeContextValue {
  theme: ThemeMode;
  toggle: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "light",
  toggle: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

function isNightTime(): boolean {
  const hour = new Date().getHours();
  return hour >= 18 || hour < 6;
}

function msUntilNextSwitch(): number {
  const now = new Date();
  const next = new Date(now);
  const hour = now.getHours();

  if (hour >= 18 || hour < 6) {
    // Currently dark — next switch is 6 AM
    if (hour >= 18) {
      next.setDate(next.getDate() + 1);
    }
    next.setHours(6, 0, 0, 0);
  } else {
    // Currently light — next switch is 6 PM
    next.setHours(18, 0, 0, 0);
  }

  return next.getTime() - now.getTime();
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<ThemeMode>("light");
  // Whether the user has manually overridden the auto theme
  const [manualOverride, setManualOverride] = useState(false);

  // On mount: read localStorage or fall back to time-based default
  useEffect(() => {
    const stored = localStorage.getItem("theme") as ThemeMode | null;
    if (stored === "light" || stored === "dark") {
      setTheme(stored);
      setManualOverride(true);
    } else {
      setTheme(isNightTime() ? "dark" : "light");
    }
  }, []);

  // Apply / remove the `.dark` class on <html>
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  // Auto-switch at 6 PM / 6 AM unless the user has manually overridden
  useEffect(() => {
    if (manualOverride) return;

    const scheduleNext = () => {
      const delay = msUntilNextSwitch();
      const timerId = setTimeout(() => {
        setTheme(isNightTime() ? "dark" : "light");
        scheduleNext();
      }, delay);
      return timerId;
    };

    const timerId = scheduleNext();
    return () => clearTimeout(timerId);
  }, [manualOverride]);

  const toggle = useCallback(() => {
    setTheme((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      localStorage.setItem("theme", next);
      return next;
    });
    setManualOverride(true);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}
