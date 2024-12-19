import { useState, useEffect } from 'react';
import axios from 'axios';

interface SiteSettings {
  phone_number: string;
  whatsapp_number: string;
  location_title: string;
  location_url: string;
  email: string;
}

export const useSiteSettings = () => {
  const [siteSettings, setSiteSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSettings = async () => {
    try {
      const response = await axios.get('/api/site-settings');
      setSiteSettings(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch site settings');
      console.error('Error fetching site settings:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateSetting = async (key: keyof SiteSettings, value: string) => {
    try {
      await axios.put(`/api/site-settings/${key}`, { value });
      setSiteSettings(prev => prev ? { ...prev, [key]: value } : null);
      return true;
    } catch (err) {
      console.error('Error updating site setting:', err);
      throw err;
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  return {
    siteSettings,
    loading,
    error,
    updateSetting,
    refetch: fetchSettings
  };
};