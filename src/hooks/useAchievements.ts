import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

export interface Achievement {
  id: string;
  title: string;
  description: string;
  image: string;
  date: string;
}

const STORAGE_KEY = 'trio_achievements';

export function useAchievements() {
  const [achievements, setAchievements] = useState<Achievement[]>(() => {
    // Initialize from localStorage on mount
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  });

  // Sync to localStorage whenever achievements change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(achievements));
    // Dispatch custom event for cross-tab sync
    window.dispatchEvent(new Event('achievements-updated'));
  }, [achievements]);

  // Listen for changes from other tabs
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        setAchievements(JSON.parse(e.newValue));
      }
    };

    const handleCustomEvent = () => {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setAchievements(JSON.parse(stored));
      }
    };

    // Listen for storage changes from other tabs
    window.addEventListener('storage', handleStorageChange);
    // Listen for custom event within same tab
    window.addEventListener('achievements-updated', handleCustomEvent);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('achievements-updated', handleCustomEvent);
    };
  }, []);

  const addAchievement = (achievement: Omit<Achievement, 'id'>) => {
    const newAchievement = {
      ...achievement,
      id: uuidv4(),
    };
    setAchievements(prev => [...prev, newAchievement]);
  };

  const removeAchievement = (id: string) => {
    setAchievements(prev => prev.filter(a => a.id !== id));
  };

  const updateAchievement = (id: string, updates: Partial<Achievement>) => {
    setAchievements(prev => 
      prev.map(a => a.id === id ? { ...a, ...updates } : a)
    );
  };

  return {
    achievements,
    addAchievement,
    removeAchievement,
    updateAchievement,
  };
} 