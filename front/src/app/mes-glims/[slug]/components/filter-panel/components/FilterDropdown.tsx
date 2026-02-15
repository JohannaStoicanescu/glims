'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from '@/app/ui/icons';

interface FilterDropdownProps {
  icon: React.ReactNode;
  label: string;
}

export default function FilterDropdown({ icon, label }: FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
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
    <div
      className="relative"
      ref={ref}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors cursor-pointer">
        {icon}
        <span className="text-sm">{label}</span>
        <ChevronDown
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 bg-white rounded-xl shadow-lg py-2 min-w-[180px] z-50">
          <p className="px-4 py-2 text-sm text-gray-500">Options à venir...</p>
        </div>
      )}
    </div>
  );
}
