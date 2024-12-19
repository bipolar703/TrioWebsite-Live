import { useState, useEffect } from 'react';
import {
  fetchAchievements,
  createAchievement,
  deleteAchievement,
  updateAchievement as updateAchievementService,
} from '../services/achievements';
import { Achievement } from '../types/achievement';

export function useAchievements() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadAchievements = async () => {
      setLoading(true);
      try {
        const fetchedAchievements = await fetchAchievements();
        setAchievements(fetchedAchievements);
        setError(null);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch achievements');
      } finally {
        setLoading(false);
      }
    };

    loadAchievements();
  }, []);

  const addAchievement = async (achievement: Omit<Achievement, 'id'>) => {
    try {
      const newAchievement = await createAchievement(achievement);
      setAchievements(prev => [...prev, newAchievement]);
    } catch (err: any) {
      setError(err.message || 'Failed to add achievement');
    }
  };

  const removeAchievement = async (id: string) => {
    try {
      await deleteAchievement(id);
      setAchievements(prev => prev.filter(achievement => achievement.id !== id));
    } catch (err: any) {
      setError(err.message || 'Failed to delete achievement');
    }
  };

  const updateAchievement = async (id: string, achievement: Omit<Achievement, 'id'>) => {
    try {
      const updatedAchievement = await updateAchievementService(id, achievement);
      setAchievements(prev => prev.map(a => (a.id === id ? updatedAchievement : a)));
    } catch (err: any) {
        setError(err.message || 'Failed to update achievement');
    }
  };

  return { achievements, loading, error, addAchievement, removeAchievement, updateAchievement };
} 