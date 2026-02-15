'use client';

import { useState, useEffect } from 'react';
import { DisplayMode } from '@/types';
import DisplayModeDropdown from '../DisplayModeDropdown';
import { SlidersHorizontal } from '@/app/ui/icons';
import {
  SortDropdown,
  FiltersDesktop,
  FiltersMobileDrawer,
} from './components';
import { FileType, SortOption } from './utils/filter-data';

type FilterPanelProps = {
  displayMode: DisplayMode;
  onDisplayModeChange: (mode: DisplayMode) => void;
};

export default function FilterPanel({
  displayMode,
  onDisplayModeChange,
}: FilterPanelProps) {
  const [sortBy, setSortBy] = useState<SortOption>('recent');
  const [fileType, setFileType] = useState<FileType>('all');
  const [selectedPeopleAppear, setSelectedPeopleAppear] = useState<string[]>(
    []
  );
  const [selectedPublishedBy, setSelectedPublishedBy] = useState<string[]>([]);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect screen size to toggle between desktop and mobile filter UIs
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleReset = () => {
    setSortBy('recent');
    setFileType('all');
    setSelectedPeopleAppear([]);
    setSelectedPublishedBy([]);
  };

  const togglePersonAppear = (id: string) => {
    setSelectedPeopleAppear((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const togglePublishedBy = (id: string) => {
    setSelectedPublishedBy((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  return (
    <div className="py-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2 md:gap-4">
          <SortDropdown
            sortBy={sortBy}
            onSortChange={setSortBy}
            isOpen={isSortOpen}
            onToggle={() => setIsSortOpen(!isSortOpen)}
            onClose={() => setIsSortOpen(false)}
            isMobile={isMobile}
          />

          {/* FILTER BUTTON */}
          <button
            onClick={() => setIsFiltersOpen(true)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg transition-colors cursor-pointer border border-gray-200 md:border-0 text-gray-700 hover:bg-gray-50">
            <span className="text-sm font-medium">Filtres</span>
            <SlidersHorizontal className="w-5 h-5" />
          </button>
        </div>

        <DisplayModeDropdown
          selectedMode={displayMode}
          onModeChange={onDisplayModeChange}
        />
      </div>

      {/* DESKTOP FILTERS */}
      {isFiltersOpen && !isMobile && <FiltersDesktop />}

      {/* MOBILE FILTERS */}
      <FiltersMobileDrawer
        isOpen={isFiltersOpen && isMobile}
        onClose={() => setIsFiltersOpen(false)}
        sortBy={sortBy}
        onSortChange={setSortBy}
        fileType={fileType}
        onFileTypeChange={setFileType}
        selectedPeopleAppear={selectedPeopleAppear}
        onTogglePersonAppear={togglePersonAppear}
        selectedPublishedBy={selectedPublishedBy}
        onTogglePublishedBy={togglePublishedBy}
        onReset={handleReset}
      />
    </div>
  );
}
