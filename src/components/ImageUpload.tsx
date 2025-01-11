import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { ImageIcon } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '../hooks/useAuth';

export interface ImageUploadProps {
  type: 'achievement' | 'hero-slide' | 'client-logo' | 'product';
  setter: (value: any) => void;
  setIsUploading: React.Dispatch<React.SetStateAction<boolean>>;
  field?: string;
  uploadPath?: string;
}

export default function ImageUpload({ 
  type,
  setter, 
  setIsUploading, 
  field = 'image', 
  uploadPath 
}: ImageUploadProps) {
  const { token } = useAuth();

  const defaultUploadPath = {
    'achievement': 'uploads/images/achievements',
    'hero-slide': 'uploads/images/hero-slides',
    'client-logo': 'uploads/images/client-logos',
    'product': 'uploads/images/products'
  }[type];

  const finalUploadPath = uploadPath || defaultUploadPath;

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;

    const file = acceptedFiles[0];
    const formData = new FormData();
    formData.append('image', file);
    formData.append('uploadPath', finalUploadPath);

    try {
      setIsUploading(true);
      const response = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to upload image');
      }

      setter((prev: any) => ({ ...prev, [field]: data.url }));
      toast.success('تم رفع الصورة بنجاح');
    } catch (error: any) {
      console.error('Error uploading image:', error);
      toast.error(error.message || 'حدث خطأ أثناء رفع الصورة');
    } finally {
      setIsUploading(false);
    }
  }, [setter, setIsUploading, field, finalUploadPath, token]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp']
    },
    maxFiles: 1,
    maxSize: 5 * 3000 * 3000, // 5MB
    onDropRejected: (rejectedFiles) => {
      if (rejectedFiles[0]?.errors[0]?.code === 'file-too-large') {
        toast.error('حجم الملف كبير جداً. الحد الأقصى هو 5 ميجابايت');
      } else {
        toast.error('نوع الملف غير مدعوم. يرجى اختيار صورة');
      }
    }
  });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
        ${isDragActive ? 'border-primary bg-primary/5' : 'border-gray-300 hover:border-primary'}`}
    >
      <input {...getInputProps()} />
      <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
      <p className="mt-2 text-sm text-gray-600">
        {isDragActive ? 'أفلت الصورة هنا' : 'اسحب وأفلت صورة هنا، أو انقر للاختيار'}
      </p>
      <p className="mt-1 text-xs text-gray-500">PNG, JPG, GIF حتى 5MB</p>
    </div>
  );
} 