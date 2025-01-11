import { HeroSlide } from '../types/heroSlide';

export async function fetchHeroSlides(): Promise<HeroSlide[]> {
  try {
    const response = await fetch('/api/hero-slides');
    if (!response.ok) throw new Error('Failed to fetch hero slides');
    return await response.json();
  } catch (error) {
    console.error('Error fetching hero slides:', error);
    throw error;
  }
}

export async function createHeroSlide(heroSlide: Omit<HeroSlide, 'id' | 'created_at' | 'updated_at'>): Promise<HeroSlide> {
  try {
    const response = await fetch('/api/hero-slides', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(heroSlide),
    });
    if (!response.ok) throw new Error('Failed to create hero slide');
    return await response.json();
  } catch (error) {
    console.error('Error creating hero slide:', error);
    throw error;
  }
}

export async function updateHeroSlide(id: number, heroSlide: Omit<HeroSlide, 'id' | 'created_at' | 'updated_at'>): Promise<HeroSlide> {
  try {
    const response = await fetch(`/api/hero-slides/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(heroSlide),
    });
    if (!response.ok) throw new Error('Failed to update hero slide');
    return await response.json();
  } catch (error) {
    console.error('Error updating hero slide:', error);
    throw error;
  }
}

export async function deleteHeroSlide(id: number): Promise<void> {
  try {
    const response = await fetch(`/api/hero-slides/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete hero slide');
  } catch (error) {
    console.error('Error deleting hero slide:', error);
    throw error;
  }
}