'use client';

import { useState, useRef, useEffect } from 'react';

import { ArrowDownUp, ChevronDown, Search } from '@/components/ui/icons';
import { Folder } from '@/types';

interface FilterPanelProps {
  readonly glimsToDisplay: Folder[];
  readonly setGlimsToDisplay: (glims: Folder[] | null) => void;
  readonly initialGlimsToDisplay: Folder[];
}

export default function FilterPanel({
  setGlimsToDisplay,
  initialGlimsToDisplay,
}: FilterPanelProps) {
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
  const [dropdownTitle, setDropdownTitle] = useState('Récent');
  const filterRef = useRef<HTMLDivElement>(null);

  const [searchInputValue, setSearchInputValue] = useState('');

  // Logic to close the filter dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node)
      ) {
        setIsFilterDropdownOpen(false);
      }
    };

    if (isFilterDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isFilterDropdownOpen]);

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInputValue(e.target.value);

    if (e.target.value.trim() !== '') {
      setGlimsToDisplay(
        initialGlimsToDisplay.filter(
          (glims) =>
            glims.title.toLowerCase().includes(e.target.value.toLowerCase()) ||
            (glims.description ?? '')
              .toLowerCase()
              .includes(e.target.value.toLowerCase())
        )
      );
    } else {
      setGlimsToDisplay(null); // null = no filter active, show full list
    }
  };

  const handleDropdownFilter = (filterTitle: string) => {
    setDropdownTitle(filterTitle);
    setIsFilterDropdownOpen(false);
  };

  return (
    <div className="w-full pt-7 pb-9 md:flex md:items-center md:justify-start gap-4">
      {/* SEARCH BAR */}
      <label
        htmlFor="glims-search-bar"
        aria-label="Barre de recherche des glims"
        className="relative w-full md:w-1/2 lg:w-1/3 ">
        <input
          type="text"
          name="glims-search-bar"
          id="glims-search-bar"
          placeholder="Rechercher un Glims"
          className="w-full px-4 py-3 rounded-full border border-gray-200 shadow-xs
        hover:border-yellow-400 focus:outline-none focus:ring-1 focus:ring-yellow-400 transition"
          value={searchInputValue}
          onChange={(e) => {
            handleSearchInputChange(e);
          }}
        />
        <Search
          size={15}
          className="absolute text-gray-500 right-3 top-1/2 transform -translate-y-1/2"
        />
      </label>

      {/* FILTER DROPDOWN */}
      <div
        ref={filterRef}
        className="relative">
        <button
          className={`relative inline-flex text-sm md:text-base items-center mt-2 md:mt-0 py-3 px-4 rounded-lg
          hover:bg-gray-100 cursor-pointer transition ${isFilterDropdownOpen ? 'bg-gray-100' : ''}`}
          onClick={() => setIsFilterDropdownOpen(!isFilterDropdownOpen)}>
          <ArrowDownUp
            size={15}
            className="mr-3"
          />
          <p className="font-semibold text-gray-500">Trier par :</p>
          <p className="pl-1 font-semibold">{dropdownTitle}</p>
          <ChevronDown
            size={15}
            className="ml-3"
          />
        </button>
        {isFilterDropdownOpen && (
          <div className="absolute mt-2 w-44 bg-white border border-gray-200 rounded-xl shadow-lg z-10 top-11 md:top-10 left-0">
            <ul className="p-2">
              <li
                className="w-full text-start px-3 py-2 rounded-lg hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  handleDropdownFilter('Récent');
                }}>
                Récent
              </li>
              <li
                className="w-full text-start px-3 py-2 rounded-lg hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  handleDropdownFilter('Vos Glims');
                }}>
                Vos Glims
              </li>
              <li
                className="w-full text-start px-3 py-2 rounded-lg hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  handleDropdownFilter('Les plus anciens');
                }}>
                Les plus anciens
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
