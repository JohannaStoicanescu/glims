'use client';

import { useRef, useState } from 'react';

import { Plus } from '@/components/ui/icons';
import { useCreateMedia } from '@/hooks';

interface AddMediaButtonProps {
  folderId: string;
  accept?: string;
  multiple?: boolean;
}

export default function AddMediaButton({
  folderId,
  accept = 'image/*,video/*',
  multiple = true,
}: AddMediaButtonProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const createMedia = useCreateMedia();

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setIsUploading(true);
      try {
        await Promise.all(
          Array.from(files).map((file) =>
            createMedia.mutateAsync({ file, folderId })
          )
        );
      } finally {
        setIsUploading(false);
      }
    }
    // Reset input to allow re-selecting the same file(s)
    event.target.value = '';
  };

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleFileChange}
        className="hidden"
        aria-hidden="true"
      />

      <button
        onClick={handleClick}
        disabled={isUploading}
        className="fixed bottom-6 right-6 w-16 h-16 bg-white rounded-2xl shadow-lg hover:shadow-xl flex items-center justify-center transition-all cursor-pointer border border-gray-100 z-40 disabled:opacity-50"
        aria-label="Ajouter des photos ou vidéos">
        <Plus className="w-8 h-8 text-gray-800" />
      </button>
    </>
  );
}
