'use client';

import React, { useRef, useMemo, useEffect } from 'react';

interface ProfilePhotoSectionProps {
  photoFile: File | null;
  onPhotoChange: (file: File | null) => void;
}

export default function ProfilePhotoSection({
  photoFile,
  onPhotoChange,
}: ProfilePhotoSectionProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Memoized URL for previewing the selected photo file
  const photoPreviewUrl = useMemo(() => {
    if (!photoFile) return null;
    return URL.createObjectURL(photoFile);
  }, [photoFile]);

  // Clean up the object URL when the component unmounts or photo changes
  useEffect(() => {
    return () => {
      if (photoPreviewUrl) URL.revokeObjectURL(photoPreviewUrl);
    };
  }, [photoPreviewUrl]);

  // Trigger the file input dialog when the user clicks the button
  const onPickPhoto = () => {
    console.log('Photo click');
    fileInputRef.current?.click();
  };

  // Handle file selection from the input
  const handleFileChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const f = e.target.files?.[0] ?? null;
    onPhotoChange(f);
  };

  // Remove the selected photo and reset the input
  const onDeletePhoto = () => {
    onPhotoChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div>
      <div className="text-sm font-semibold text-slate-900">
        Photo de profil
      </div>

      <div className="pt-5 flex flex-col items-center gap-4 sm:flex-row">
        {/* PHOTO PREVIEW */}
        <div className="h-28 w-28 overflow-hidden rounded-full bg-slate-100 ring-1 ring-slate-200 sm:h-20 sm:w-20">
          {photoPreviewUrl ? (
            // Show the selected photo preview
            <img
              src={photoPreviewUrl}
              alt="Aperçu"
              className="h-full w-full object-cover"
            />
          ) : (
            // Placeholder if no photo is selected
            <div className="flex h-full w-full items-center justify-center text-sm text-slate-400">
              —
            </div>
          )}
        </div>

        {/* Hidden file input for photo selection */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />

        <div className="flex flex-col md:flex-row items-center justify-start gap-3">
          <div className="flex gap-3 sm:justify-start">
            <button
              type="button"
              onClick={onPickPhoto}
              className="text-xs sm:text-sm cursor-pointer rounded-xl border border-slate-300 bg-white px-4 py-2.5 font-semibold text-slate-900 transition hover:bg-slate-50 hover:border-slate-400">
              {photoFile ? 'Changer la photo' : 'Ajouter une photo'}
            </button>

            <button
              type="button"
              onClick={onDeletePhoto}
              className="text-xs sm:text-sm cursor-pointer rounded-xl border border-slate-200 bg-white px-4 py-2.5 font-semibold text-rose-600 transition hover:bg-rose-50 hover:border-rose-300">
              Supprimer
            </button>
          </div>

          <div className="text-xs sm:text-sm font-semibold text-slate-500">
            {photoFile ? photoFile.name : "Aucune photo pour l'instant"}
          </div>
        </div>
      </div>
    </div>
  );
}
