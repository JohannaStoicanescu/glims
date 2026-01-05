'use client';

import { DisplayMode } from '@/types';
import DisplayModeDropdown from './DisplayModeDropdown';

type FilterPanelProps = {
  displayMode: DisplayMode;
  onDisplayModeChange: (mode: DisplayMode) => void;
};

export default function FilterPanel({
  displayMode,
  onDisplayModeChange,
}: FilterPanelProps) {
  return (
    <div className="py-6">
      <div className="flex justify-between items-center">
        <p>bonjour je filtre</p>
        <DisplayModeDropdown
          selectedMode={displayMode}
          onModeChange={onDisplayModeChange}
        />
      </div>
    </div>
  );
}
