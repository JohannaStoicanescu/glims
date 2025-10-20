'use client';

import { useFormContext, Controller } from 'react-hook-form';

import { ChevronDown, Earth, Lock } from '../../../../ui/icons';

interface AccessibilityOption {
  value: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}

export function AccessibilityToTheGlimCheckboxes() {
  const { control } = useFormContext();

  return (
    <div>
      <p className="text-black font-medium mb-2">Accéssibilité du Glim</p>

      <Controller
        name="accessibility"
        control={control}
        defaultValue="private"
        render={({ field }) => (
          <>
            <div className="border border-gray-200 rounded-xl">
              {/* PRIVATE CHECKBOX */}
              <label
                htmlFor="private-checkbox"
                className="w-full flex items-center justify-between px-4 py-3 rounded-t-xl cursor-pointer hover:bg-gray-50 font-medium">
                <div className="flex items-center">
                  <Lock
                    size={18}
                    className="text-gray-500 inline mr-4"
                  />
                  <div className="flex flex-col items-start">
                    <span className="text-lg">Privée</span>
                    <span className="text-gray-500">
                      Validez l'accès de chaque invité
                    </span>
                  </div>
                </div>
                <input
                  type="radio"
                  id="private-checkbox"
                  value="private"
                  checked={field.value === 'private'}
                  onChange={() => field.onChange('private')}
                  aria-label="Validez l'accès de chaque invité"
                  className="appearance-none border-5 p-1 w-3 h-3 border-gray-100 rounded-full cursor-pointer hover:bg-blue-500 checked:border-blue-500"
                />
              </label>

              {/* DIVIDER */}
              <div className="h-[1px] bg-gray-200 w-full" />

              {/* PUBLIC CHECKBOX */}
              <label
                htmlFor="public-checkbox"
                className="w-full flex items-center justify-between px-4 py-3 rounded-t-xl cursor-pointer hover:bg-gray-50 font-medium">
                <div className="flex items-center">
                  <Earth
                    size={18}
                    className="text-gray-500 inline mr-4"
                  />
                  <div className="flex flex-col items-start">
                    <span className="text-lg">Publique</span>
                    <span className="text-gray-500">
                      N'importe qui avec le lien
                    </span>
                  </div>
                </div>
                <input
                  type="radio"
                  id="public-checkbox"
                  value="public"
                  checked={field.value === 'public'}
                  onChange={() => field.onChange('public')}
                  aria-label="N'importe qui avec le lien"
                  className="appearance-none border-5 p-1 w-3 h-3 border-gray-100 rounded-full cursor-pointer hover:bg-blue-500 checked:border-blue-500"
                />
              </label>
            </div>
          </>
        )}
      />
    </div>
  );
}
