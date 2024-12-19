interface SiteSettings {
    [key: string]: string;
  }
  
  export async function fetchSiteSettings(): Promise<SiteSettings> {
    try {
      const response = await fetch('/api/site-settings');
      if (!response.ok) throw new Error('Failed to fetch site settings');
      return await response.json();
    } catch (error) {
      console.error('Error fetching site settings:', error);
      return {};
    }
  }
  
  export async function updateSiteSetting(key: string, value: string): Promise<void> {
    try {
      const response = await fetch(`/api/site-settings/${key}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ value }),
      });
      if (!response.ok) throw new Error('Failed to update site setting');
    } catch (error) {
      console.error('Error updating site setting:', error);
      throw error;
    }
  }