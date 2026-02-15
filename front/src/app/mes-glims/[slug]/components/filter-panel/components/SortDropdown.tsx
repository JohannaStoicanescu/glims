'use client';

import { useRef, useEffect } from 'react';

import { ChevronDown } from '@/app/ui/icons';
import {
  SortOption,
  sortOptions,
  sortOptionsMobile,
} from '../utils/filter-data';

interface SortDropdownProps {
  sortBy: SortOption;
  onSortChange: (value: SortOption) => void;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
  isMobile: boolean;
}

export default function SortDropdown({
  sortBy,
  onSortChange,
  isOpen,
  onToggle,
  onClose,
  isMobile,
}: SortDropdownProps) {
  const sortRef = useRef<HTMLDivElement>(null);

  const currentSortLabel =
    sortOptions.find((opt) => opt.value === sortBy)?.label || 'Récent';

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleSelect = (value: SortOption) => {
    onSortChange(value);
    onClose();
  };

  const options = isMobile ? sortOptionsMobile : sortOptions;

  return (
    <div
      className="relative"
      ref={sortRef}>
      <button
        onClick={onToggle}
        className="flex items-center gap-1 md:gap-2 text-gray-700 hover:text-gray-900 transition-colors cursor-pointer border border-gray-200 md:border-0 rounded-lg px-3 py-2 md:px-0 md:py-0">
        <span className="text-sm">
          Trier par :{' '}
          <span className="font-semibold">
            {sortBy === 'recent' ? 'Récent' : currentSortLabel}
          </span>
        </span>
        <ChevronDown
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 bg-white rounded-xl shadow-lg py-2 min-w-[200px] z-50">
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className={`w-full text-left px-4 py-3 text-sm transition-colors cursor-pointer ${
                sortBy === option.value
                  ? 'bg-gray-100 font-semibold text-gray-900'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}>
              {option.value === 'recent' ? 'Récent' : option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
