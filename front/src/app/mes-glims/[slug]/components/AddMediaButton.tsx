'use client';

import { useRef, useState } from 'react';

import { Plus } from '@/app/ui/icons';

interface AddMediaButtonProps {
  onFilesSelected?: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
}

export default function AddMediaButton({
  onFilesSelected,
  accept = 'image/*,video/*',
  multiple = true,
}: AddMediaButtonProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isSelecting, setIsSelecting] = useState(false);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const filesArray = Array.from(files);
      console.log('Fichiers sélectionnés:', filesArray);
      onFilesSelected?.(filesArray);
    }
    // Reset input to allow re-selecting the same file(s)
    event.target.value = '';
    setIsSelecting(false);
  };

  const handleFocus = () => {
    setIsSelecting(true);
  };

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleFileChange}
        onFocus={handleFocus}
        className="hidden"
        aria-hidden="true"
      />

      <button
        onClick={handleClick}
        disabled={isSelecting}
        className="fixed bottom-6 right-6 w-16 h-16 bg-white rounded-2xl shadow-lg hover:shadow-xl flex items-center justify-center transition-all cursor-pointer border border-gray-100 z-40 disabled:opacity-50"
        aria-label="Ajouter des photos ou vidéos">
        <Plus className="w-8 h-8 text-gray-800" />
      </button>
    </>
  );
}
