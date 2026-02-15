import { Users } from '@/app/ui/icons';
import { MenuItem } from './menu-items';
import MenuItemButton from './MenuItemButton';
import DangerItemButton from './DangerItemButton';

interface DesktopDropdownProps {
  menuRef: React.RefObject<HTMLDivElement>;
  menuItems: MenuItem[];
  dangerItems: MenuItem[];
  downloadProgress: number;
  onClose: () => void;
}

export default function DesktopDropdown({
  menuRef,
  menuItems,
  dangerItems,
  downloadProgress,
  onClose,
}: DesktopDropdownProps) {
  return (
    <div
      ref={menuRef}
      className="hidden md:block absolute right-0 top-full px-2 pt-5 pb-2 mt-2 w-72 bg-white rounded-xl shadow-xl border border-gray-100 z-50 overflow-hidden">
      <div className="flex justify-center">
        <button
          className="flex items-center gap-3 px-4 py-2.5 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-50 transition"
          onClick={() => console.log('Gérer les membres')}>
          <span className="font-medium">Gérer les membres</span>
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
