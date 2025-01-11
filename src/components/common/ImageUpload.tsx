import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useAuth } from '../../hooks/useAuth';
import { ImageIcon } from 'lucide-react';

interface ImageUploadProps {
  uploadPath?: string;
  onUploadSuccess: (imageUrl: string) => void;
  onUploadError: (error: string) => void;
  className?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  uploadPath = 'uploads/images',
  onUploadSuccess,
  onUploadError,
  className = ''
}) => {
  const { token } = useAuth();

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) {
      onUploadError('No file selected');
      return;
    }

    const file = acceptedFiles[0];
    const formData = new FormData();
    formData.append('image', file);
    formData.append('uploadPath', uploadPath);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Upload failed');
      }

      const data = await response.json();
      onUploadSuccess(data.url);
    } catch (error) {
      console.error('Upload error:', error);
      onUploadError(error instanceof Error ? error.message : 'Upload failed');
    }
  }, [token, onUploadSuccess, onUploadError, uploadPath]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpg', '.jpeg', '.png', '.gif', '.webp']
    },
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024 // 5MB
  });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors ${
        isDragActive ? 'border-primary bg-primary/10' : 'border-gray-300 hover:border-primary'
      } ${className}`}
    >
      <input {...getInputProps()} />
      <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
      {isDragActive ? (
        <p className="text-primary">أفلت الملف هنا...</p>
      ) : (
        <p>اسحب وأفلت الصورة هنا، أو انقر للاختيار</p>
      )}
      <p className="text-sm text-gray-500 mt-2">
        الحد الأقصى للحجم: 5 ميجابايت | الصيغ المدعومة: JPG, PNG, GIF, WEBP
      </p>
    </div>
  );
};

export default ImageUpload; 