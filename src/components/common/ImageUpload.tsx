import { useState, useRef } from "react";
import { Upload, Loader2 } from "lucide-react";
import { getPublicUrl, uploadImage } from "../../utils/fileSystem";

interface ImageUploadProps {
  currentImageUrl: string;
  onImageUrlChange: (url: string) => void;
  className?: string;
}

export default function ImageUpload({
  currentImageUrl,
  onImageUrlChange,
  className = "",
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      // const snapshot = await uploadBytes(storageRef, file);
      const uploadedFileName = await uploadImage(file);
      const downloadUrl = getPublicUrl(uploadedFileName!);
      onImageUrlChange(downloadUrl);
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Failed to upload image. Please try again.");
      event.target.value = "";
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center space-x-4 ">
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
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept="image/*"
        className="hidden"
      />

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
