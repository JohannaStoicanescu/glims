'use client';

import { useFormContext, Controller } from 'react-hook-form';

import { ChevronDown } from '../../../../ui/icons';

interface UsersRoleOptions {
  value: string;
  title: string;
}

export function UsersRoleSelection() {
  const { control } = useFormContext();

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

  return (
    <Controller
      name="userRole"
      control={control}
      defaultValue="readonly"
      render={({ field }) => (
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
          <label
            htmlFor="userRole"
            className="font-medium">
            Rôle des invités
          </label>
          <div className="relative">
            <select
              id="userRole"
              value={field.value}
              onChange={field.onChange}
              className="w-full md:w-auto appearance-none cursor-pointer border border-gray-200 py-3 px-3 pr-10 rounded-xl bg-gray-50 text-gray-800 hover:border-yellow-400 focus:border-yellow-400 focus:outline-none transition"
              aria-label="Sélectionner le rôle des invités">
              {options.map((option) => (
                <option
                  key={option.value}
                  value={option.value}>
                  {option.title}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <ChevronDown className="w-4 h-4 text-gray-600" />
            </div>
          </div>
        </div>
      )}
    />
  );
}
