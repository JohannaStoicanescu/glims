'use client';

import { useState } from 'react';
import { DisplayMode } from '@/types';
import DisplayModeDropdown from '../DisplayModeDropdown';
import { SlidersHorizontal } from '@/components/ui/icons';
import {
  SortDropdown,
  FiltersDesktop,
  FiltersMobileDrawer,
} from './components';
import { FileType, SortOption } from './utils/filter-data';
import { useIsMobile } from '@/hooks/use-media-query';

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
  const isMobile = useIsMobile();

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
            aria-label="Ouvrir les filtres"
            aria-expanded={isFiltersOpen}
            className="flex items-center gap-2 px-3 py-2 rounded-lg transition-colors cursor-pointer border border-gray-200 md:border-0 text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200 md:focus:ring-0">
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
