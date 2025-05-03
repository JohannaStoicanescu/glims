import { FiSearch } from 'react-icons/fi';
import { LuSettings2 } from 'react-icons/lu';

interface SearchBarProps {
  isFilterPanelOpen: boolean;
  setIsFilterPanelOpen: (isFilterPanelOpen: boolean) => void;
}
export default function SearchBar({
  isFilterPanelOpen,
  setIsFilterPanelOpen,
}: SearchBarProps) {
  return (
    <div className="flex justify-between items-center pt-2">
      <div className="relative w-full">
        <input
          type="text"
          placeholder="Chercher une photo, un glims"
          className="w-full text-lg text-gray-600 p-2 px-5 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-800"
        />
        <FiSearch className="absolute right-4 y-auto top-3 w-5 h-5 text-black" />
      </div>
      <button
        onClick={() => setIsFilterPanelOpen(!isFilterPanelOpen)}
        className={` ml-4 p-4 rounded-xl hover:bg-gray-100`}>
        <LuSettings2
          onClick={() => setIsFilterPanelOpen(!isFilterPanelOpen)}
          size={22}
        />
      </button>
    </div>
  );
}
