import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function SearchBar() {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Chercher une photo, un glims"
        className="w-full p-3 pl-10 border border-gray-600 rounded-full focus:outline-none focus:ring-1 focus:ring-gray-800"
      />
      <MagnifyingGlassIcon className="absolute left-3 top-3 w-5 h-5 text-black" />
    </div>
  );
}
