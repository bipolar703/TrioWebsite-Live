import { useState, useEffect } from 'react';
import { Achievement } from '../types/achievement';
import { useAuth } from './useAuth';

export function useAchievements() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { token } = useAuth();

  useEffect(() => {
    fetchAchievements();
  }, []);

  const fetchAchievements = async () => {
    try {
      const response = await fetch('/api/achievements');
      if (!response.ok) {
        throw new Error('Failed to fetch achievements');
      }
      const data = await response.json();
      setAchievements(data);
      setError(null);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to fetch achievements');
    } finally {
      setLoading(false);
    }
  };

  const addAchievement = async (achievement: Omit<Achievement, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const response = await fetch('/api/achievements', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(achievement)
      });

      if (!response.ok) {
        throw new Error('Failed to add achievement');
      }

      await fetchAchievements();
    } catch (error) {
      throw error instanceof Error ? error : new Error('Failed to add achievement');
    }
  };

  const updateAchievement = async (id: number, achievement: Omit<Achievement, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const response = await fetch(`/api/achievements/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(achievement)
      });

      if (!response.ok) {
        throw new Error('Failed to update achievement');
      }

      await fetchAchievements();
    } catch (error) {
      throw error instanceof Error ? error : new Error('Failed to update achievement');
    }
  };

  const deleteAchievement = async (id: number) => {
    try {
      const response = await fetch(`/api/achievements/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete achievement');
      }

      await fetchAchievements();
    } catch (error) {
      throw error instanceof Error ? error : new Error('Failed to delete achievement');
    }
  };

  return {
    achievements,
    loading,
    error,
    addAchievement,
    updateAchievement,
    deleteAchievement
  };
} 