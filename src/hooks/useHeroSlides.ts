import { useState, useEffect } from 'react';
import {
  fetchHeroSlides,
  createHeroSlide,
  updateHeroSlide as updateHeroSlideAPI,
  deleteHeroSlide as deleteHeroSlideAPI,
} from '../services/heroSlides';
import { HeroSlide } from '../types/heroSlide';

export function useHeroSlides() {
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadHeroSlides = async () => {
      setLoading(true);
      try {
        const fetchedHeroSlides = await fetchHeroSlides();
        setHeroSlides(fetchedHeroSlides);
        setError(null);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch hero slides');
      } finally {
        setLoading(false);
      }
    };

    loadHeroSlides();
  }, []);

  const addHeroSlide = async (heroSlide: Omit<HeroSlide, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const newHeroSlide = await createHeroSlide(heroSlide);
      setHeroSlides(prev => [...prev, newHeroSlide]);
      return newHeroSlide;
    } catch (err: any) {
      setError(err.message || 'Failed to add hero slide');
      throw err;
    }
  };

  const updateHeroSlide = async (id: number, heroSlide: Omit<HeroSlide, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const updatedHeroSlide = await updateHeroSlideAPI(id, heroSlide);
      setHeroSlides(prev => prev.map(slide => (slide.id === id ? updatedHeroSlide : slide)));
      return updatedHeroSlide;
    } catch (err: any) {
      setError(err.message || 'Failed to update hero slide');
      throw err;
    }
  };

  const deleteHeroSlide = async (id: number) => {
    try {
      await deleteHeroSlideAPI(id);
      setHeroSlides(prev => prev.filter(slide => slide.id !== id));
    } catch (err: any) {
      setError(err.message || 'Failed to delete hero slide');
      throw err;
    }
  };

  return { heroSlides, loading, error, addHeroSlide, updateHeroSlide, deleteHeroSlide };
}