'use client';

import { LayoutDashboard } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

import { DISPLAY_MODE_LABELS } from '@/constants';
import { DisplayMode } from '@/types';

interface DisplayModeDropdownProps {
  selectedMode: DisplayMode;
  onModeChange: (mode: DisplayMode) => void;
}

export default function DisplayModeDropdown({
  selectedMode,
  onModeChange,
}: DisplayModeDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const displayModes: DisplayMode[] = [
    'default',
    'square',
    'landscape',
    'portrait',
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleModeSelect = (mode: DisplayMode) => {
    onModeChange(mode);
    setIsOpen(false);
  };

  return (
    <div
      className="relative"
      ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-2 bg-white rounded-lg cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent transition-colors">
        <LayoutDashboard />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10 animate-in fade-in slide-in-from-bottom-4 duration-200">
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
        </div>
      )}
    </div>
  );
}
