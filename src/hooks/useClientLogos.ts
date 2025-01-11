import { useState, useEffect } from 'react';
import { ClientLogo } from '../types/clientLogo';
import { useAuth } from './useAuth';

export function useClientLogos() {
  const [clientLogos, setClientLogos] = useState<ClientLogo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { token } = useAuth();

  useEffect(() => {
    fetchClientLogos();
  }, []);

  const fetchClientLogos = async () => {
    try {
      const response = await fetch('/api/client-logos');
      if (!response.ok) {
        throw new Error('Failed to fetch client logos');
      }
      const data = await response.json();
      setClientLogos(data);
      setError(null);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to fetch client logos');
    } finally {
      setLoading(false);
    }
  };

  const addClientLogo = async (clientLogo: Omit<ClientLogo, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const response = await fetch('/api/client-logos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(clientLogo)
      });

      if (!response.ok) {
        throw new Error('Failed to add client logo');
      }

      await fetchClientLogos();
    } catch (error) {
      throw error instanceof Error ? error : new Error('Failed to add client logo');
    }
  };

  const updateClientLogo = async (id: number, clientLogo: Omit<ClientLogo, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const response = await fetch(`/api/client-logos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(clientLogo)
      });

      if (!response.ok) {
        throw new Error('Failed to update client logo');
      }

      await fetchClientLogos();
    } catch (error) {
      throw error instanceof Error ? error : new Error('Failed to update client logo');
    }
  };

  const deleteClientLogo = async (id: number) => {
    try {
      const response = await fetch(`/api/client-logos/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete client logo');
      }

      await fetchClientLogos();
    } catch (error) {
      throw error instanceof Error ? error : new Error('Failed to delete client logo');
    }
  };

  return {
    clientLogos,
    loading,
    error,
    addClientLogo,
    updateClientLogo,
    deleteClientLogo
  };
}