'use client';

import { useContext, useEffect, useId, useState } from 'react';
import { MdOutlineAddBox } from 'react-icons/md';

import { NewUserContext } from '../utils/new-user-context';
import StepIndicators from './StepIndicators';
import { FiTrash2 } from 'react-icons/fi';
import { LuPencil } from 'react-icons/lu';

export default function ImagePicker() {
  const [currentStep, setCurrentStep] = useState(2);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const id = useId();

  const { newUserData, setNewUserData } = useContext(NewUserContext);

  function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    setNewUserData({
      ...newUserData,
      profileImage: file,
    });

    if (!file) return;

    const url = URL.createObjectURL(file);

    setPreviewUrl((old) => {
      if (old) URL.revokeObjectURL(old);
      return url;
    });

    // STEP 3 : preview
    setCurrentStep(3);
  }

  function resetImage() {
    setPreviewUrl((old) => {
      if (old) URL.revokeObjectURL(old);
      return null;
    });

    // STEP 2 : pick image
    setCurrentStep(2);
  }

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  return (
    <>
      <div className="flex flex-col items-center gap-2 mb-8">
        <h1 className="text-center text-3xl font-bold mt-8 md:mt-0">
          {currentStep === 2 ? 'Ajoutez votre photo' : "C'est bien vous ?"}
        </h1>
      </div>

      <div className="mt-3 mb-6">
        {/* IMAGE PICKER */}
        {currentStep === 2 && (
          <div className="w-full">
            <label
              htmlFor={id}
              className="flex items-center justify-center py-12 w-full rounded-2xl border border-slate-200 bg-slate-50 cursor-pointer 
              hover:border-slate-300 hover:shadow-md hover:text-slate-400 transition"
              aria-label="Ajouter une image de vous">
              <MdOutlineAddBox size={50} />
            </label>
            <input
              id={id}
              type="file"
              accept="image/*"
              className="sr-only"
              onChange={onFileChange}
            />
          </div>
        )}

        {/* PREVIEW  */}
        {currentStep === 3 && previewUrl && (
          <div className="flex flex-col items-center">
            <div className="relative inline-block px-6 py-4">
              <img
                src={previewUrl}
                alt="Aperçu de l'image sélectionnée"
                className="h-35 w-35 rounded-full object-cover"
              />
              <button
                type="button"
                onClick={resetImage}
                aria-label="Supprimer l'image"
                className="absolute top-0 right-0 cursor-pointer text-center text-white rounded-full bg-black p-4 border-7 border-white
              hover:text-black hover:bg-slate-100 transition">
                <FiTrash2 size={18} />
              </button>
              <label
                htmlFor={id}
                aria-label="Modifier l'image"
                className="absolute bottom-0 right-0  cursor-pointer text-center rounded-full bg-slate-100 p-4 border-7 border-white 
              hover:bg-black hover:text-white transition">
                <LuPencil size={18} />
              </label>
              <input
                id={id}
                type="file"
                accept="image/*"
                className="sr-only"
                onChange={onFileChange}
              />
            </div>
          </div>
        )}
      </div>

      <StepIndicators currentStep={currentStep} />
    </>
  );
}
