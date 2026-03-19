import { Users } from '@/components/ui/icons';
import { MenuItem } from './menu-items';
import MenuItemButton from './MenuItemButton';
import DangerItemButton from './DangerItemButton';

interface DesktopDropdownProps {
  menuItems: MenuItem[];
  dangerItems: MenuItem[];
  downloadProgress: number;
  onClose: () => void;
  onOpenSettings: () => void;
}

export default function DesktopDropdown({
  menuItems,
  dangerItems,
  downloadProgress,
  onClose,
  onOpenSettings,
}: DesktopDropdownProps) {
  return (
    <div className="flex flex-col py-2 rounded-2xl">
      <div className="flex justify-center pt-2">
        <button
          className="flex items-center gap-3 px-4 py-2.5 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-50 transition"
          onClick={onOpenSettings}>
          <span className="font-medium">Paramètres</span>
          <Users size={18} />
        </button>
      </div>

      <div className="px-4 pt-5 border-b border-gray-200 pb-2">
        <p className="text-sm text-gray-500">Informations sur le Glims</p>
      </div>

      {menuItems.map((item, index) => (
        <MenuItemButton
          key={index}
          item={item}
          onClose={onClose}
          downloadProgress={downloadProgress}
          variant="desktop"
        />
      ))}

      {dangerItems.map((item, index) => (
        <DangerItemButton
          key={index}
          item={item}
          onClose={onClose}
          variant="desktop"
        />
      ))}
    </div>
  );
}
