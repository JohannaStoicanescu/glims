'use client';

import { ChevronDown } from '@/app/ui/icons';
import { Dropdown } from '@/app/ui';
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
  const currentSortLabel =
    sortOptions.find((opt) => opt.value === sortBy)?.label || 'Récent';

  const handleSelect = (value: SortOption) => {
    onSortChange(value);
    onClose();
  };

  const options = isMobile ? sortOptionsMobile : sortOptions;

  return (
    <Dropdown
      isOpen={isOpen}
      onClose={onClose}
      align="left"
      width="w-52"
      trigger={
        <button
          onClick={onToggle}
          aria-label="Trier par"
          aria-expanded={isOpen}
          className="flex items-center gap-1 md:gap-2 text-gray-700 hover:text-gray-900 transition-colors cursor-pointer border border-gray-200 md:border-0 rounded-lg px-3 py-2 md:px-0 md:py-0 focus:outline-none focus:ring-2 focus:ring-gray-200 md:focus:ring-0">
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
      }>
      <div className="py-1">
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
    </Dropdown>
  );
}
