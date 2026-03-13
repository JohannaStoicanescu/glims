import Image from 'next/image';

import { Person } from '../utils/filter-data';

interface PeopleAvatarGridProps {
  people: Person[];
  selectedIds: string[];
  onToggle: (id: string) => void;
  maxVisible?: number;
}

export default function PeopleAvatarGrid({
  people,
  selectedIds,
  onToggle,
  maxVisible = 11,
}: PeopleAvatarGridProps) {
  const visiblePeople = people.slice(0, maxVisible);
  const remainingCount = people.length - maxVisible;

  return (
    <div className="grid grid-cols-6 gap-2">
      {visiblePeople.map((person) => {
        const isSelected = selectedIds.includes(person.id);
        return (
          <button
            key={person.id}
            onClick={() => onToggle(person.id)}
            aria-pressed={isSelected}
            aria-label={`Filtrer par ${person.name}`}
            className={`relative w-12 h-12 rounded-full overflow-hidden border-2 transition-all cursor-pointer ${
              isSelected
                ? 'border-orange-500 scale-105'
                : 'border-transparent'
            }`}>
            <Image
              src={person.avatar}
              alt={`Photo de profil de ${person.name}`}
              fill
              className="object-cover"
            />
          </button>
        );
      })}
      {remainingCount > 0 && (
        <button 
          className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-sm text-gray-600 cursor-pointer"
          aria-label={`Voir les ${remainingCount} autres membres`}>
          +{remainingCount}
        </button>
      )}
    </div>
  );
}
