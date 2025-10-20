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
                <div
                  onClick={() => setIsOpenDesktop(!isOpenDesktop)}
                  className={`flex items-center justify-between cursor-pointer border border-gray-200 p-3 rounded-xl bg-gray-50 text-gray-500 hover:border-yellow-400 focus:border-yellow-400 transition`}>
                  <Eye
                    size={18}
                    className="text-gray-600"
                  />
                  <p className="mx-2 text-gray-800">{selectedOption?.title}</p>
                  <ChevronDown
                    className={`w-4 h-4 text-gray-600 transition-transform ${isOpenDesktop ? 'rotate-180' : ''}`}
                  />
                </div>
                {isOpenDesktop && (
                  <div className="absolute w-62 max-h-45 overflow-y-scroll scroll-smooth top-full right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg p-2 z-10">
                    {options.map((option, index) => (
                      <div
                        key={option.value + index}
                        className="py-3 px-3 hover:bg-gray-50 cursor-pointer rounded-xl"
                        onClick={() => {
                          field.onChange(option.value);
                          setIsOpenDesktop(false);
                        }}>
                        <span className="text-base font-medium text-gray-800">
                          {option.title}
                        </span>
                      </div>
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
                <div
                  className="w-full py-4 px-4 bg-gray-50 rounded-xl border border-gray-200 cursor-pointer hover:border-yellow-400 focus:border-yellow-400 "
                  onClick={() => setIsOpenMobile(!isOpenMobile)}>
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
                </div>

                {/* DROPDOWN OPTIONS */}
                {isOpenMobile && (
                  <div className="absolute bottom-[-100px] left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg p-2">
                    {options.map((option) => (
                      <div
                        key={option.value}
                        className="py-4 px-2 hover:bg-gray-50 cursor-pointer rounded-xl"
                        onClick={() => {
                          field.onChange(option.value);
                          setIsOpenMobile(false);
                        }}>
                        <div className="flex items-center gap-3">
                          <div className="flex flex-col">
                            <span className="text-base font-medium text-gray-800">
                              {option.title}
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
        );
      }}
    />
  );
}
