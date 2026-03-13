'use client';

import { createPortal } from 'react-dom';
import {
  ChevronLeft,
  ChevronRight,
  ArrowDownUp,
  Upload,
  Users,
  File,
} from '@/app/ui/icons';
import {
  SortOption,
  FileType,
  sortOptions,
  fileTypeOptions,
  mockPeople,
} from '../utils/filter-data';
import { SortChips, FileTypeChips } from './ChipButton';
import PeopleAvatarGrid from './PeopleAvatarGrid';

interface FiltersMobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  sortBy: SortOption;
  onSortChange: (value: SortOption) => void;
  fileType: FileType;
  onFileTypeChange: (value: FileType) => void;
  selectedPeopleAppear: string[];
  onTogglePersonAppear: (id: string) => void;
  selectedPublishedBy: string[];
  onTogglePublishedBy: (id: string) => void;
  onReset: () => void;
}

export default function FiltersMobileDrawer({
  isOpen,
  onClose,
  sortBy,
  onSortChange,
  fileType,
  onFileTypeChange,
  selectedPeopleAppear,
  onTogglePersonAppear,
  selectedPublishedBy,
  onTogglePublishedBy,
  onReset,
}: FiltersMobileDrawerProps) {
  if (!isOpen) return null;

  // We use createPortal to render the menu outside the normal React tree (directly into document.body),
  //so it can visually overlay the rest of the app and avoid CSS stacking/context issues.
  return createPortal(
    <div 
      className="fixed inset-0 bg-white z-[9999] flex flex-col"
      role="dialog"
      aria-modal="true"
      aria-labelledby="filters-mobile-title">
      {/* HEADER */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100">
        <button
          onClick={onClose}
          className="flex items-center gap-2 text-gray-700 cursor-pointer"
          aria-label="Fermer les filtres">
          <ChevronLeft className="w-5 h-5" aria-hidden="true" />
          <span id="filters-mobile-title" className="text-lg font-semibold">Filtres</span>
        </button>
        <button
          onClick={onReset}
          className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 cursor-pointer">
          Réinitialiser
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4">
        {/* SORT SECTION */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <ArrowDownUp className="w-5 h-5 text-gray-600" />
            <span className="font-medium text-gray-900">Trier par</span>
          </div>
          <SortChips
            options={sortOptions}
            selectedValue={sortBy}
            onSelect={onSortChange}
          />
        </div>

        {/* FILE TYPE SECTION */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <File className="w-5 h-5" />
            <span className="font-medium text-gray-900">Type de fichier</span>
          </div>
          <FileTypeChips
            options={fileTypeOptions}
            selectedValue={fileType}
            onSelect={(value) => onFileTypeChange(value as FileType)}
          />
        </div>

        {/* PEOPLE APPEAR SECTION */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Users className="w-5 h-5" />
            <span className="font-medium text-gray-900">
              Cette personne apparaît
            </span>
          </div>
          <PeopleAvatarGrid
            people={mockPeople}
            selectedIds={selectedPeopleAppear}
            onToggle={onTogglePersonAppear}
          />
        </div>

        {/* PUBLISHED BY SECTION */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Upload className="w-5 h-5" />
            <span className="font-medium text-gray-900">Publié par</span>
          </div>
          <PeopleAvatarGrid
            people={mockPeople}
            selectedIds={selectedPublishedBy}
            onToggle={onTogglePublishedBy}
          />
        </div>
      </div>

      <div className="px-4 py-4 border-t border-gray-100">
        <button
          onClick={onClose}
          className="w-full bg-gray-900 text-white py-4 rounded-xl font-medium flex items-center justify-center gap-2">
          Continuer
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>,
    document.body
  );
}
