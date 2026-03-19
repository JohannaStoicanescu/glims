'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { Pencil, Plus, Trash2 } from '@/components/ui/icons';
import { NewUser } from '@/types';

export default function ImagePicker() {
  const { setValue, watch } = useFormContext<NewUser>();
  const profileImage = watch('profileImage');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const inputId = 'image-picker-input';

  function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setValue('profileImage', file);

    const url = URL.createObjectURL(file);
    setPreviewUrl((old) => {
      if (old) URL.revokeObjectURL(old);
      return url;
    });
  }

  function resetImage() {
    setValue('profileImage', null);
    setPreviewUrl((old) => {
      if (old) URL.revokeObjectURL(old);
      return null;
    });
  }

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const hasImage = !!profileImage && previewUrl;

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col items-center gap-2 mb-8">
        <h1 className="text-center text-3xl font-bold">
          {!hasImage ? 'Ajoutez votre photo' : "C'est bien vous ?"}
        </h1>
      </div>

      <div className="w-full mb-6 flex justify-center">
        {/* PICKER STATE */}
        {!hasImage ? (
          <div className="w-full">
            <label
              htmlFor={inputId}
              className="flex items-center justify-center py-12 w-full rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 cursor-pointer 
              hover:border-orange-400 hover:bg-orange-50 transition-all duration-300"
              aria-label="Ajouter une image de vous">
              <Plus
                size={50}
                className="text-slate-400"
              />
            </label>
            <input
              id={inputId}
              type="file"
              accept="image/*"
              className="sr-only"
              onChange={onFileChange}
            />
          </div>
        ) : (
          /* PREVIEW STATE */
          <div className="relative inline-block px-6 py-4">
            <div className="relative h-36 w-36 rounded-full overflow-hidden border-4 border-white shadow-lg">
              <Image
                src={previewUrl}
                fill
                alt="Aperçu de votre photo"
                className="object-cover"
              />
            </div>

            <button
              type="button"
              onClick={resetImage}
              aria-label="Supprimer l'image"
              className="absolute top-0 right-0 cursor-pointer text-center text-white rounded-full bg-black p-3 border-4 border-white
              hover:bg-red-500 transition-colors shadow-md">
              <Trash2 size={18} />
            </button>

            <label
              htmlFor={inputId}
              aria-label="Modifier l'image"
              className="absolute bottom-0 right-0 cursor-pointer text-center rounded-full bg-slate-100 p-3 border-4 border-white 
              hover:bg-black hover:text-white transition-colors shadow-md">
              <Pencil size={18} />
            </label>

            <input
              id={inputId}
              type="file"
              accept="image/*"
              className="sr-only"
              onChange={onFileChange}
            />
          </div>
        )}
      </div>
    </div>
  );
}
