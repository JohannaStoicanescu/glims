'use client';

import { RxCross2 } from 'react-icons/rx';
import { LuArrowUpWideNarrow } from 'react-icons/lu';
import { RiShapesLine } from 'react-icons/ri';
import { LuCalendarRange } from 'react-icons/lu';
import { IoIosArrowForward } from 'react-icons/io';
import { useState } from 'react';

interface EventFilterPanelProps {
  activeFilters: {
    sort: string;
    type: string;
    date: string;
  };
  onApplyFilters: (filters: {
    sort: string;
    type: string;
    date: string;
  }) => void;
  onClose?: () => void;
}

export default function EventFilterPanel({
  activeFilters,
  onApplyFilters,
  onClose,
}: EventFilterPanelProps) {
  const [sortOption, setSortOption] = useState(activeFilters.sort);
  const [fileType, setFileType] = useState(activeFilters.type);
  const [dateOption, setDateOption] = useState(activeFilters.date);

  const handleApplyFilters = () => {
    onApplyFilters({
      sort: sortOption,
      type: fileType,
      date: dateOption,
    });
    if (onClose) onClose();
  };

  const handleReset = () => {
    setSortOption('none');
    setFileType('none');
    setDateOption('none');
  };

  return (
    <div className="font-medium w-full py-2">
      <div className="flex justify-between items-center">
        <p className="text-xl text-gray-700">Filtres</p>
        <div className="flex items-center">
          <button
            className="border-1 border-gray-200 rounded-lg py-1 px-3 text-gray-500 text-lg active:bg-gray-100"
            onClick={handleReset}>
            Réinitialiser
          </button>
          <button className="m-2 p-2 rounded-xl hover:bg-gray-100 active:bg-gray-100">
            <RxCross2
              size={22}
              onClick={onClose}
            />
          </button>
        </div>
      </div>
      <hr className="my-1 h-0.5 border-t-1 border-gray-200" />
      <div>
        <div className="flex items-center text-gray-700 my-3">
          <LuArrowUpWideNarrow className="ml-4 mr-2" />
          <p className="text-lg">Trier par</p>
        </div>
        <div>
          <button
            className={`border-1 ${sortOption === 'latest' ? 'border-gray-600' : 'border-gray-200'} rounded-lg py-1 px-3 text-gray-500 text-lg mr-2 mb-2 active:bg-gray-100`}
            onClick={() => setSortOption('latest')}>
            Dernière publications
          </button>
          <button
            className={`border-1 ${sortOption === 'most_viewed' ? 'border-gray-600' : 'border-gray-200'} rounded-lg py-1 px-3 text-gray-500 text-lg mr-2 mb-2 active:bg-gray-100`}
            onClick={() => setSortOption('most_viewed')}>
            Les plus vues
          </button>
          <button
            className={`border-1 ${sortOption === 'most_popular' ? 'border-gray-600' : 'border-gray-200'} rounded-lg py-1 px-3 text-gray-500 text-lg mr-2 mb-2 active:bg-gray-100`}
            onClick={() => setSortOption('most_popular')}>
            Les plus populaires
          </button>
        </div>
      </div>
      <div>
        <div className="flex items-center text-gray-700 my-3">
          <RiShapesLine className="ml-4 mr-2" />
          <p className="text-gray-700 text-lg">Type de fichier</p>
        </div>
        <div>
          <button
            className={`border-1 ${fileType === 'all' ? 'border-gray-600' : 'border-gray-200'} rounded-lg py-1 px-3 text-gray-500 text-lg mr-2 mb-2 active:bg-gray-100`}
            onClick={() => setFileType('all')}>
            Tout
          </button>
          <button
            className={`border-1 ${fileType === 'photos' ? 'border-gray-600' : 'border-gray-200'} rounded-lg py-1 px-3 text-gray-500 text-lg mr-2 mb-2 active:bg-gray-100`}
            onClick={() => setFileType('photos')}>
            Photos
          </button>
          <button
            className={`border-1 ${fileType === 'videos' ? 'border-gray-600' : 'border-gray-200'} rounded-lg py-1 px-3 text-gray-500 text-lg mr-2 mb-2 active:bg-gray-100`}
            onClick={() => setFileType('videos')}>
            Vidéos
          </button>
        </div>
      </div>
      <div>
        <div className="flex items-center text-gray-700 my-3">
          <LuCalendarRange className="ml-4 mr-2" />
          <p className="text-lg">Date de chargement</p>
        </div>
        <div>
          <button
            className={`border-1 ${dateOption === 'all' ? 'border-gray-600' : 'border-gray-200'} rounded-lg py-1 px-3 text-gray-500 text-lg mr-2 mb-2 active:bg-gray-100`}
            onClick={() => setDateOption('all')}>
            Tout les photos
          </button>
          <button
            className={`border-1 ${dateOption === 'last24h' ? 'border-gray-600' : 'border-gray-200'} rounded-lg py-1 px-3 text-gray-500 text-lg mr-2 mb-2 active:bg-gray-100`}
            onClick={() => setDateOption('last24h')}>
            Dernières 24h
          </button>
        </div>
      </div>
      <button
        className="flex justify-center items-center w-full bg-gray-800 text-white py-3 my-4 rounded-xl active:bg-gray-600"
        onClick={handleApplyFilters}>
        <p className="mr-3">Continuer</p>
        <IoIosArrowForward />
      </button>
    </div>
  );
}
