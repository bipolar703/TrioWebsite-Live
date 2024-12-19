import { ClientLogo } from '../types/clientLogo';

export async function fetchClientLogos(): Promise<ClientLogo[]> {
  try {
    const response = await fetch('/api/client-logos');
    if (!response.ok) throw new Error('Failed to fetch client logos');
    return await response.json();
  } catch (error) {
    console.error('Error fetching client logos:', error);
    return [];
  }
}

export async function createClientLogo(clientLogo: Omit<ClientLogo, 'id'>): Promise<ClientLogo> {
  try {
    const response = await fetch('/api/client-logos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(clientLogo),
    });
    if (!response.ok) throw new Error('Failed to create client logo');
    return await response.json();
  } catch (error) {
    console.error('Error creating client logo:', error);
    throw error;
  }
}

export async function updateClientLogo(id: string, clientLogo: Omit<ClientLogo, 'id'>): Promise<ClientLogo> {
  try {
    const response = await fetch(`/api/client-logos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(clientLogo),
    });
    if (!response.ok) throw new Error('Failed to update client logo');
    return await response.json();
  } catch (error) {
    console.error('Error updating client logo:', error);
    throw error;
  }
}

export async function deleteClientLogo(id: string): Promise<void> {
  try {
    const response = await fetch(`/api/client-logos/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete client logo');
  } catch (error) {
    console.error('Error deleting client logo:', error);
    throw error;
  }
}