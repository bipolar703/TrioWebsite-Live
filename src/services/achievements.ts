import { Achievement } from '../types/achievement';

export async function fetchAchievements(): Promise<Achievement[]> {
  try {
    const response = await fetch('/api/achievements');
    if (!response.ok) throw new Error('Failed to fetch achievements');
    return await response.json();
  } catch (error) {
    console.error('Error fetching achievements:', error);
    return [];
  }
}

export async function createAchievement(achievement: Omit<Achievement, 'id'>): Promise<Achievement> {
  try {
    const response = await fetch('/api/achievements', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(achievement),
    });
    if (!response.ok) throw new Error('Failed to create achievement');
    return await response.json();
  } catch (error) {
    console.error('Error creating achievement:', error);
    throw error;
  }
}

export async function deleteAchievement(id: string): Promise<void> {
  try {
    const response = await fetch(`/api/achievements/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete achievement');
  } catch (error) {
    console.error('Error deleting achievement:', error);
    throw error;
  }
}

export async function uploadImage(file: File): Promise<string> {
  try {
    const formData = new FormData();
    formData.append('image', file);

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) throw new Error('Failed to upload image');
    const data = await response.json();
    return data.url;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
} 