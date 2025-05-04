import { RxCross2 } from 'react-icons/rx';

interface FilterContainerProps {
  applyFilters: () => void;
  activeFilters: {
    sort: string;
    type: string;
    date: string;
  };
  activeFilter: string;
  setActiveFilters: (filters: {
    sort: string;
    type: string;
    date: string;
  }) => void;
}

export default function FilterContainer({
  applyFilters,
  activeFilters,
  activeFilter,
  setActiveFilters,
}: FilterContainerProps) {
  const textToDisplay = () => {
    if (activeFilter === 'latest') return 'Dernière publications';
    if (activeFilter === 'most_viewed') return 'Les plus vues';
    if (activeFilter === 'most_popular') return 'Les plus populaires';
    if (activeFilter === 'photos') return 'Photos';
    if (activeFilter === 'videos') return 'Vidéos';
    if (activeFilter === 'last24h') return 'Dernières 24h';
  };

  const handleFilterRemoval = () => {
    if (
      activeFilter === 'latest' ||
      activeFilter === 'most_viewed' ||
      activeFilter === 'most_popular'
    ) {
      setActiveFilters({
        type: activeFilters.type,
        date: activeFilters.date,
        sort: 'none',
      });
    }
    if (activeFilter === 'images' || activeFilter === 'videos') {
      setActiveFilters({
        date: activeFilters.date,
        sort: activeFilters.sort,
        type: 'all_type',
      });
    }
    if (activeFilter === 'last24h') {
      setActiveFilters({
        type: activeFilters.type,
        sort: activeFilters.sort,
        date: 'all',
      });
    }
    console.log(activeFilters);
    return applyFilters();
  };

  return (
    <button
      onClick={handleFilterRemoval}
      className="flex items-center bg-gray-100 py-2 px-4 rounded-lg active:bg-white border-1 border-gray-100 active:text-gray-400">
      <p className="font-semibold">{textToDisplay()}</p>
      <RxCross2
        size={16}
        className="ml-2"
      />
    </button>
  );
}
