'use client';

import { useFormContext, Controller } from 'react-hook-form';

import { ChevronDown } from '@/app/ui/icons';
import { usersRoleOptions } from '@/constants';

export function UsersRoleSelection() {
  const { control } = useFormContext();

  return (
    <Controller
      name="userRole"
      control={control}
      defaultValue="readonly"
      render={({ field }) => (
        <div className="flex justify-between items-center gap-2">
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
              className="w-auto appearance-none cursor-pointer border border-gray-200 py-2 px-3 pr-10 rounded-lg bg-gray-50 text-gray-800 
              hover:border-yellow-400 focus:border-yellow-400 focus:outline-none transition"
              aria-label="Sélectionner le rôle des invités">
              {usersRoleOptions.map((option) => (
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
