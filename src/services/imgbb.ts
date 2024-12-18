const IMGBB_API_KEY = '015353696c0da97b4033c0486f4476cf';

export async function uploadToImgBB(file: File): Promise<string> {
  try {
    const base64Image = await fileToBase64(file);
    const formData = new FormData();
    formData.append('key', IMGBB_API_KEY);
    formData.append('image', base64Image.split(',')[1]); // Remove data:image/xxx;base64, prefix

    const response = await fetch('https://api.imgbb.com/1/upload', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) throw new Error('Failed to upload to ImgBB');
    
    const data = await response.json();
    return data.data.display_url;
  } catch (error) {
    console.error('ImgBB upload error:', error);
    throw new Error('Failed to upload image');
  }
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
} 