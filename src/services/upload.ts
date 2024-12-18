import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

// Initialize Firebase (add your config)
const firebaseConfig = {
  // Your firebase config here
  storageBucket: "your-bucket.appspot.com"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export async function uploadImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = () => {
      // Convert file to base64 string
      const base64String = reader.result as string;
      
      // Store in localStorage (temporary solution)
      const imageId = `image_${Date.now()}`;
      localStorage.setItem(imageId, base64String);
      
      // Return a local URL
      resolve(`/api/images/${imageId}`);
    };
    
    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };
    
    reader.readAsDataURL(file);
  });
} 