import axios from 'axios';

export const uploadImage = async (file: File, type: string): Promise<string> => {
  try {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('type', type);

    const response = await axios.post('/api/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (!response.data || !response.data.url) {
      throw new Error('Invalid response from server');
    }

    return response.data.url;
  } catch (error) {
    console.error('Error uploading image:', error);
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        throw new Error('Upload endpoint not found. Please check server configuration.');
      } else if (error.response?.status === 413) {
        throw new Error('File size too large. Maximum size is 5MB.');
      } else if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
    }
    throw new Error('Failed to upload image. Please try again.');
  }
}; 