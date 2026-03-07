'use client';

import { useState } from 'react';
import { ChevronDown } from '@/app/ui/icons';
import { Dropdown } from '@/app/ui';

interface FilterDropdownProps {
  icon: React.ReactNode;
  label: string;
}

export default function FilterDropdown({ icon, label }: FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dropdown
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      align="left"
      width="w-52"
      trigger={
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors cursor-pointer focus:outline-none">
          {icon}
          <span className="text-sm">{label}</span>
          <ChevronDown
            className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          />
        </button>
      }>
      <div className="py-2">
        <p className="px-4 py-2 text-sm text-gray-500">Options à venir...</p>
      </div>
    </Dropdown>
  );
}
