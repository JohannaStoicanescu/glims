'use client';

import { LayoutDashboard } from 'lucide-react';
import { useState } from 'react';

import { DISPLAY_MODE_LABELS } from '@/constants';
import { DisplayMode } from '@/types';
import { Dropdown } from '@/app/ui';

interface DisplayModeDropdownProps {
  selectedMode: DisplayMode;
  onModeChange: (mode: DisplayMode) => void;
}

export default function DisplayModeDropdown({
  selectedMode,
  onModeChange,
}: DisplayModeDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const displayModes: DisplayMode[] = [
    'default',
    'square',
    'landscape',
    'portrait',
  ];

  const handleModeSelect = (mode: DisplayMode) => {
    onModeChange(mode);
    setIsOpen(false);
  };

  return (
    <Dropdown
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      width="w-48"
      trigger={
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Changer le mode d'affichage"
          aria-expanded={isOpen}
          className="flex items-center gap-2 p-2 bg-white rounded-lg cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-600 transition-colors">
          <LayoutDashboard size={20} />
        </button>
      }>
      <div className="py-1">
        {displayModes.map((mode, index) => (
          <button
            key={mode}
            onClick={() => handleModeSelect(mode)}
            className={`w-full text-left px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 transition-all duration-200 ease-out ${
              selectedMode === mode
                ? 'bg-gray-50 text-orange-600 font-medium'
                : 'text-gray-700'
            }`}
            style={{
              animationDelay: `${index * 30}ms`,
              animationDuration: '200ms',
            }}>
            {DISPLAY_MODE_LABELS[mode]}
          </button>
        ))}
      </div>
    </Dropdown>
  );
}
