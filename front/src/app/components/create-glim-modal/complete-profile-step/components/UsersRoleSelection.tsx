'use client';

import { useState, useRef, useEffect } from 'react';
import { useFormContext, Controller } from 'react-hook-form';

import { ChevronDown, Eye } from '../../../../ui/icons';

interface UsersRoleOptions {
  value: string;
  title: string;
}

export function UsersRoleSelection() {
  const { control } = useFormContext();
  const [isOpenDesktop, setIsOpenDesktop] = useState(false);
  const [isOpenMobile, setIsOpenMobile] = useState(false);
  const dropdownRefDesktop = useRef<HTMLDivElement>(null);
  const dropdownRefMobile = useRef<HTMLDivElement>(null);

  const options: Array<UsersRoleOptions> = [
    {
      value: 'readonly',
      title: 'Lecture seule',
    },
    {
      value: 'uploadonly',
      title: 'Ajout seul',
    },
    {
      value: 'downloadonly',
      title: 'Téléchargement seul',
    },
    {
      value: 'uploaddownload',
      title: 'Ajout et téléchargement',
    },
    {
      value: 'admin',
      title: 'Administrateur',
    },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Handle desktop dropdown
      if (
        dropdownRefDesktop.current &&
        !dropdownRefDesktop.current.contains(event.target as Node)
      ) {
        setIsOpenDesktop(false);
      }
      // Handle mobile dropdown
      if (
        dropdownRefMobile.current &&
        !dropdownRefMobile.current.contains(event.target as Node)
      ) {
        setIsOpenMobile(false);
      }
    };

    if (isOpenDesktop || isOpenMobile) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpenDesktop, isOpenMobile]);

  return (
    <Controller
      name="userRole"
      control={control}
      defaultValue="readonly"
      render={({ field }) => {
        const selectedOption = options.find((opt) => opt.value === field.value);

        return (
          <>
            {/* DESKTOP */}
            <div className="hidden md:flex justify-between items-center">
              <label
                htmlFor="roles"
                className="font-medium">
                Rôle des invités
              </label>
              <div
                className="relative"
                ref={dropdownRefDesktop}>
                <button
                  type="button"
                  onClick={() => setIsOpenDesktop(!isOpenDesktop)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setIsOpenDesktop(!isOpenDesktop);
                    }
                  }}
                  aria-expanded={isOpenDesktop}
                  aria-haspopup="listbox"
                  aria-label="Sélectionner le rôle des invités"
                  className={`flex items-center justify-between cursor-pointer border border-gray-200 p-3 rounded-xl bg-gray-50 text-gray-500 hover:border-yellow-400 focus:border-yellow-400 transition`}>
                  <Eye
                    size={18}
                    className="text-gray-600"
                  />
                  <p className="mx-2 text-gray-800">{selectedOption?.title}</p>
                  <ChevronDown
                    className={`w-4 h-4 text-gray-600 transition-transform ${isOpenDesktop ? 'rotate-180' : ''}`}
                  />
                </button>
                {isOpenDesktop && (
                  <div className="absolute w-62 max-h-45 overflow-y-scroll scroll-smooth top-full right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg p-2 z-10">
                    {options.map((option, index) => (
                      <button
                        key={option.value + index}
                        type="button"
                        className="w-full py-3 px-3 hover:bg-gray-50 cursor-pointer rounded-xl text-left"
                        onClick={() => {
                          field.onChange(option.value);
                          setIsOpenDesktop(false);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            field.onChange(option.value);
                            setIsOpenDesktop(false);
                          } else if (e.key === 'Escape') {
                            setIsOpenDesktop(false);
                          }
                        }}
                        role="option"
                        aria-selected={field.value === option.value}>
                        <span className="text-base font-medium text-gray-800">
                          {option.title}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* MOBILE */}
            <div className="block md:hidden">
              <p className="font-medium mb-2">Rôle des invités</p>
              <div
                className="relative"
                ref={dropdownRefMobile}>
                {/* SELECT BUTTON */}
                <button
                  type="button"
                  className="w-full py-4 px-4 bg-gray-50 rounded-xl border border-gray-200 cursor-pointer hover:border-yellow-400 focus:border-yellow-400"
                  onClick={() => setIsOpenMobile(!isOpenMobile)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setIsOpenMobile(!isOpenMobile);
                    }
                  }}
                  aria-expanded={isOpenMobile}
                  aria-haspopup="listbox"
                  aria-label="Sélectionner le rôle des invités">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Eye
                        size={18}
                        className="text-gray-600"
                      />
                      <span className="text-base font-medium text-gray-800">
                        {selectedOption?.title}
                      </span>
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 text-gray-400 transition-transform ${isOpenMobile ? 'rotate-180' : ''}`}
                    />
                  </div>
                </button>

                {/* DROPDOWN OPTIONS */}
                {isOpenMobile && (
                  <div className="absolute bottom-[-100px] left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg p-2">
                    {options.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        className={`w-full py-4 px-2 hover:bg-gray-50 cursor-pointer rounded-xl text-left ${
                          field.value === option.value ? 'bg-gray-50' : ''
                        }`}
                        onClick={() => {
                          field.onChange(option.value);
                          setIsOpenMobile(false);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            field.onChange(option.value);
                            setIsOpenMobile(false);
                          } else if (e.key === 'Escape') {
                            setIsOpenMobile(false);
                          }
                        }}
                        role="option"
                        aria-selected={field.value === option.value}>
                        <div className="flex items-center gap-3">
                          <div className="flex flex-col">
                            <span className="text-base font-medium text-gray-800">
                              {option.title}
                            </span>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </>
        );
      }}
    />
  );
}
