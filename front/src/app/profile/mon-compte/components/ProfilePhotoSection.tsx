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
    <div className="flex flex-col items-center md:items-start">
      <div className="w-full text-sm font-semibold text-slate-900 text-left">
        Photo de profil
      </div>

      <div className="pt-5 flex flex-col items-center gap-6 w-full md:flex-row md:justify-start">
        {/* PHOTO PREVIEW */}
        <button
          type="button"
          onClick={onPickPhoto}
          aria-label="Choisir une photo de profil"
          className="h-36 w-36 overflow-hidden rounded-full bg-slate-100 ring-1 ring-slate-200 cursor-pointer md:h-20 md:w-20 transition hover:opacity-80 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-orange-400">
          {photoPreviewUrl ? (
            // Show the selected photo preview
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={photoPreviewUrl}
              alt="Aperçu de votre photo de profil"
              className="h-full w-full object-cover"
            />
          ) : (
            // Placeholder if no photo is selected
            <div className="flex h-full w-full items-center justify-center text-sm text-slate-400">
              <span className="text-4xl" aria-hidden="true">—</span>
            </div>
          )}
        </button>

        {/* Hidden file input for photo selection */}
        <input
          ref={fileInputRef}
          type="file"
          id="profile-photo-input"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
          aria-hidden="true"
        />

        <div className="flex flex-row items-center justify-center gap-4 w-full md:w-auto">
          <button
            type="button"
            onClick={onDeletePhoto}
            className="text-xs md:text-sm cursor-pointer rounded-xl border border-rose-200 bg-white px-8 py-3 font-bold text-rose-600 transition hover:bg-rose-50 hover:border-rose-300 shadow-sm">
            Supprimer
          </button>

          <div className="text-xs md:text-sm font-bold text-slate-500">
            {photoFile ? photoFile.name : "Aucune photo pour l'instant"}
          </div>
        </div>
      </div>
    </div>
  );
}
