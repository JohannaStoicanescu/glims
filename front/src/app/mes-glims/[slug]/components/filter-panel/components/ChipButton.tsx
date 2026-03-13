import { SortOption } from '../utils/filter-data';

interface ChipButtonProps {
  label: string;
  isSelected: boolean;
  onClick: () => void;
}

function ChipButton({ label, isSelected, onClick }: ChipButtonProps) {
  return (
    <button
      onClick={onClick}
      aria-pressed={isSelected}
      className={`px-4 py-2 rounded-full text-sm border transition-colors cursor-pointer ${
        isSelected
          ? 'bg-gray-900 text-white border-gray-900'
          : 'bg-white text-gray-700 border-gray-300'
      }`}>
      {label}
    </button>
  );
}

interface SortChipsProps {
  options: { value: SortOption; label: string }[];
  selectedValue: SortOption;
  onSelect: (value: SortOption) => void;
}

export function SortChips({
  options,
  selectedValue,
  onSelect,
}: SortChipsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => (
        <ChipButton
          key={option.value}
          label={option.label}
          isSelected={selectedValue === option.value}
          onClick={() => onSelect(option.value)}
        />
      ))}
    </div>
  );
}

interface FileTypeChipsProps {
  options: { value: string; label: string }[];
  selectedValue: string;
  onSelect: (value: string) => void;
}

export function FileTypeChips({
  options,
  selectedValue,
  onSelect,
}: FileTypeChipsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => (
        <ChipButton
          key={option.value}
          label={option.label}
          isSelected={selectedValue === option.value}
          onClick={() => onSelect(option.value)}
        />
      ))}
    </div>
  );
}

export default ChipButton;
