'use client';

import { useState, useRef, useEffect } from 'react';
import { useFormContext, Controller } from 'react-hook-form';

import { ChevronDown, Earth, Lock } from '../../../../ui/icons';

interface AccessibilityOption {
  value: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}

export function AccessibilityToTheGlimCheckboxes() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { control } = useFormContext();

  const options: Array<AccessibilityOption> = [
    {
      value: 'private',
      icon: (
        <Lock
          size={18}
          className="text-gray-600"
        />
      ),
      title: 'Privée',
      description: "Validez l'accès de chaque invité",
    },
    {
      value: 'public',
      icon: (
        <Earth
          size={18}
          className="text-gray-600"
        />
      ),
      title: 'Publique',
      description: "N'importe qui avec le lien",
    },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div>
      <p className="text-black font-medium mb-2">Accéssibilité du Glim</p>

      <Controller
        name="accessibility"
        control={control}
        defaultValue="private"
        render={({ field }) => (
          <>
            {/* DESKTOP */}
            <div className="border border-gray-200 rounded-xl hidden md:block">
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

            {/* MOBILE */}
            <div className="block md:hidden">
              <div
                className="relative"
                ref={dropdownRef}>
                {/* SELECT BUTTON */}
                <div
                  className="w-full py-4 px-4 bg-gray-50 rounded-xl border border-gray-200 cursor-pointer hover:border-yellow-400 focus:border-yellow-400 "
                  onClick={() => setIsOpen(!isOpen)}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {options.find((opt) => opt.value === field.value)?.icon}
                      <span className="text-base font-medium text-gray-800">
                        {
                          options.find((opt) => opt.value === field.value)
                            ?.title
                        }
                      </span>
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    />
                  </div>
                </div>

                {/* DROPDOWN OPTIONS */}
                {isOpen && (
                  <div className="absolute top-full left-0 right-0 mt-4 bg-white border border-gray-200 rounded-xl shadow-lg z-10 p-2">
                    {options.map((option, index) => (
                      <div
                        key={option.value + index}
                        className={`py-4 px-2 hover:bg-gray-50 cursor-pointer rounded-xl`}
                        onClick={() => {
                          field.onChange(option.value);
                          setIsOpen(false);
                        }}>
                        <div className="flex items-center gap-3">
                          {option.icon}
                          <div className="flex flex-col">
                            <span className="text-base font-medium text-gray-800">
                              {option.title}
                            </span>
                            <span className="text-sm text-gray-600">
                              {option.description}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      />
    </div>
  );
}
