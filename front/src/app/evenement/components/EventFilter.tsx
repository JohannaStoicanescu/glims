import { useState } from 'react';
import { IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5';
import { BiSlider } from 'react-icons/bi';
import { IoImagesOutline } from 'react-icons/io5';
import { IoCalendarOutline } from 'react-icons/io5';

interface EventFilterProps {
  onApplyFilters: (filters: {
    sort: string;
    type: string;
    date: string;
  }) => void;
  onClose?: () => void;
}

export default function EventFilter({
  onApplyFilters,
  onClose,
}: EventFilterProps) {
  const [sortOption, setSortOption] = useState('none');
  const [fileType, setFileType] = useState('none');
  const [dateOption, setDateOption] = useState('none');

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
    <div className="max-w-lg mx-auto bg-white p-4 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center text-gray-700 font-semibold text-lg">
          <IoChevronBackOutline className="w-5 h-5 mr-2" />
          Filtres
        </div>
        <button className="text-gray-500 px-4 py-2 rounded-full text-sm">
          Réinitialiser
        </button>
      </div>

      <div className="h-px bg-gray-200 mb-6"></div>

      <div className="mb-6">
        <div className="flex items-center mb-3 text-gray-700">
          <BiSlider className="w-5 h-5 mr-2" />
          <span>Trier par</span>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            className={`px-4 py-2 rounded-full border ${sortOption === 'latest' ? 'bg-gray-100 border-gray-300' : 'border-gray-200'}`}
            onClick={() => setSortOption('latest')}>
            Dernière publications
          </button>
          <button
            className={`px-4 py-2 rounded-full border ${sortOption === 'most_viewed' ? 'bg-gray-100 border-gray-300' : 'border-gray-200'}`}
            onClick={() => setSortOption('most_viewed')}>
            Les plus vues
          </button>
          <button
            className={`px-4 py-2 rounded-full border ${sortOption === 'most_popular' ? 'bg-gray-100 border-gray-300' : 'border-gray-200'}`}
            onClick={() => setSortOption('most_popular')}>
            Les plus populaires
          </button>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex items-center mb-3 text-gray-700">
          <IoImagesOutline className="w-5 h-5 mr-2" />
          <span>Type de fichier</span>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            className={`px-4 py-2 rounded-full border ${fileType === 'all' ? 'bg-gray-100 border-gray-300' : 'border-gray-200'}`}
            onClick={() => setFileType('all')}>
            Tout
          </button>
          <button
            className={`px-4 py-2 rounded-full border ${fileType === 'photos' ? 'bg-gray-100 border-gray-300' : 'border-gray-200'}`}
            onClick={() => setFileType('photos')}>
            Photos
          </button>
          <button
            className={`px-4 py-2 rounded-full border ${fileType === 'videos' ? 'bg-gray-100 border-gray-300' : 'border-gray-200'}`}
            onClick={() => setFileType('videos')}>
            Vidéos
          </button>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex items-center mb-3 text-gray-700">
          <IoCalendarOutline className="w-5 h-5 mr-2" />
          <span>Date de chargement</span>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            className={`px-4 py-2 rounded-full border ${dateOption === 'all' ? 'bg-gray-100 border-gray-300' : 'border-gray-200'}`}
            onClick={() => setDateOption('all')}>
            Toutes les photos
          </button>
          <button
            className={`px-4 py-2 rounded-full border ${dateOption === 'last24h' ? 'bg-gray-100 border-gray-300' : 'border-gray-200'}`}
            onClick={() => setDateOption('last24h')}>
            Dernières 24h
          </button>
        </div>
      </div>

      <button
        className="w-full bg-gray-900 text-white py-3 px-4 rounded-lg font-medium flex items-center justify-center mt-4"
        onClick={handleApplyFilters}>
        Continuer
        <IoChevronForwardOutline className="w-5 h-5 ml-1" />
      </button>
    </div>
  );
}
