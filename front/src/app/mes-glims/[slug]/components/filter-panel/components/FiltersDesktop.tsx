import FilterDropdown from './FilterDropdown';
import { Calendar, Upload, Users, File } from '@/components/ui/icons';

export default function FiltersDesktop() {
  return (
    <div className="flex items-center gap-4 mt-4 flex-wrap">
      <FilterDropdown
        icon={<File className="w-5 h-5" />}
        label="Tout les fichiers"
      />
      <FilterDropdown
        icon={<Users className="w-5 h-5" />}
        label="Cette personne apparaît"
      />
      <FilterDropdown
        icon={<Upload className="w-5 h-5" />}
        label="Publié par"
      />
      <FilterDropdown
        icon={<Calendar className="w-5 h-5" />}
        label="Date d'ajout"
      />
    </div>
  );
}
