import { useState, useRef, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import { ChevronDown, Plus } from '@/app/ui/icons';
import { usersRoleOptions } from '@/constants';

export default function InviteByEmailSection() {
  const { watch } = useFormContext();
  const [userRole] = watch(['userRole']);
  const [email, setEmail] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [dropdownTitle, setDropdownTitle] = useState(userRole);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Logic to close the dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <div className="flex items-center w-full border border-gray-200 bg-gray-50 rounded-lg">
      <input
        aria-label="Ajouter une adresse email"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => {
          e.preventDefault();
          setEmail(e.target.value);
        }}
        className="w-full border-r border-gray-200 px-4 py-3"
      />
      <div
        ref={dropdownRef}
        className="relative flex justify-center flex-1">
        <button
          type="button"
          className={`relative flex-1 px-2 flex justify-center items-center text-sm md:text-base
          hover:bg-red-50 hover:text-orange-600 cursor-pointer transition ${isDropdownOpen ? 'bg-gray-100' : ''}`}
          onClick={(e) => {
            e.preventDefault();
            setIsDropdownOpen(!isDropdownOpen);
          }}>
          <p className="pl-1 font-semibold">{dropdownTitle}</p>
          <ChevronDown
            size={20}
            className="ml-3"
          />
        </button>
        {isDropdownOpen && (
          <div className="absolute mt-2 w-44 bg-white border border-gray-200 rounded-xl shadow-lg z-10 top-11 md:top-10 left-0">
            <ul className="p-2">
              {usersRoleOptions.map((role, index) => (
                <li
                  key={role.value + index}
                  className="w-full text-start px-3 py-2 rounded-lg hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setDropdownTitle(role.title);
                    setIsDropdownOpen(false);
                  }}>
                  {role.title}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <button
        type="button"
        className="w-12 h-12 flex items-center justify-center text-gray-500 rounded-r-lg border-l border-gray-200 
        hover:bg-red-50 cursor-pointer transition">
        <Plus size={15} />
      </button>
    </div>
  );
}
