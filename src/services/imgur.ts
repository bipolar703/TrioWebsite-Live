const IMGUR_CLIENT_ID = 'YOUR_IMGUR_CLIENT_ID'; // Get this from imgur.com/api/register

export async function uploadToImgur(file: File): Promise<string> {
  try {
    const formData = new FormData();
    formData.append('image', file);

    const response = await fetch('https://api.imgur.com/3/image', {
      method: 'POST',
      headers: {
        Authorization: `Client-ID ${IMGUR_CLIENT_ID}`,
      },
      body: formData,
    });

    if (!response.ok) throw new Error('Failed to upload to Imgur');
    
    const data = await response.json();
    return data.data.link;
  } catch (error) {
    console.error('Imgur upload error:', error);
    throw new Error('Failed to upload image');
  }
} 