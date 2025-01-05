import { useState, useRef } from 'react';
import { Upload, Link, Loader2 } from 'lucide-react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../utils/firebase';

interface ImageUploadProps {
  currentImageUrl: string;
  onImageUrlChange: (url: string) => void;
  className?: string;
}

export default function ImageUpload({ currentImageUrl, onImageUrlChange, className = '' }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [urlInput, setUrlInput] = useState(currentImageUrl);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const storageRef = ref(storage, `images/${Date.now()}-${file.name}`);
      const snapshot = await uploadBytes(storageRef, file);
      const downloadUrl = await getDownloadURL(snapshot.ref);
      onImageUrlChange(downloadUrl);
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Failed to upload image. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onImageUrlChange(urlInput);
    setShowUrlInput(false);
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center space-x-4">
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-dark-800 border border-gray-300 dark:border-gray-700 rounded-md hover:bg-gray-50 dark:hover:bg-dark-700"
          disabled={isUploading}
        >
          {isUploading ? (
            <Loader2 className="h-5 w-5 mr-2 animate-spin" />
          ) : (
            <Upload className="h-5 w-5 mr-2" />
          )}
          Upload Image
        </button>
        <button
          type="button"
          onClick={() => setShowUrlInput(!showUrlInput)}
          className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-dark-800 border border-gray-300 dark:border-gray-700 rounded-md hover:bg-gray-50 dark:hover:bg-dark-700"
        >
          <Link className="h-5 w-5 mr-2" />
          Add URL
        </button>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept="image/*"
        className="hidden"
      />

      {showUrlInput && (
        <form onSubmit={handleUrlSubmit} className="flex gap-2">
          <input
            type="url"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder="Enter image URL"
            className="flex-1 rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          />
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-primary-500 rounded-md hover:bg-primary-600"
          >
            Add
          </button>
        </form>
      )}

      {currentImageUrl && (
        <div className="mt-4">
          <img
            src={currentImageUrl}
            alt="Preview"
            className="max-h-48 rounded-md object-contain"
          />
        </div>
      )}
    </div>
  );
}