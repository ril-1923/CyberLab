import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { UserSettings } from '@/types';

interface SettingsContextValue {
  settings: UserSettings;
  updateSettings: (updates: Partial<UserSettings>) => void;
}

const SettingsContext = createContext<SettingsContextValue | undefined>(undefined);

const STORAGE_KEY = 'cyberlab_settings';

const defaultSettings: UserSettings = {
  theme: 'dark',
  notifications: {
    courseReminders: true,
    challengeNotifications: true,
    achievementNotifications: true,
  },
  learningPreferences: {
    dailyGoal: 100,
    preferredCategories: [],
  },
};

function loadSettings(): UserSettings {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? { ...defaultSettings, ...JSON.parse(raw) } : defaultSettings;
  } catch {
    return defaultSettings;
  }
}

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<UserSettings>(() => loadSettings());

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  }, [settings]);

  function updateSettings(updates: Partial<UserSettings>) {
    setSettings((prev) => ({ ...prev, ...updates }));
  }

  return (
    <SettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings(): SettingsContextValue {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error('useSettings must be used within SettingsProvider');
  return ctx;
}
