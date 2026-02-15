import { Users, Link } from '@/app/ui/icons';
import { MenuItem } from './menu-items';
import MenuItemButton from './MenuItemButton';
import DangerItemButton from './DangerItemButton';

interface MobileDrawerProps {
  menuRef: React.RefObject<HTMLDivElement>;
  menuItems: MenuItem[];
  dangerItems: MenuItem[];
  downloadProgress: number;
  onClose: () => void;
}

export default function MobileDrawer({
  menuRef,
  menuItems,
  dangerItems,
  downloadProgress,
  onClose,
}: MobileDrawerProps) {
  return (
    <div className="md:hidden fixed inset-0 z-50">
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />

      <div
        ref={menuRef}
        className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl max-h-[90vh] overflow-y-auto animate-slide-up">
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-12 h-1 bg-gray-300 rounded-full" />
        </div>

        <div className="px-5 pb-4">
          <h2 className="text-xl font-bold">Gérer le Glims</h2>
        </div>

        <div className="px-5 pb-4">
          <button
            className="flex items-center justify-center gap-3 px-6 py-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition"
            onClick={() => {
              console.log('Gérer les membres');
              onClose();
            }}>
            <span className="font-medium">Gérer les membres</span>
            <Users size={18} />
          </button>
        </div>

        <div className="px-4 pb-10">
          <div className="px-4 pt-2">
            <p className="text-sm text-gray-500">Informations sur le Glims</p>
          </div>

          {menuItems.map((item, index) => (
            <MenuItemButton
              key={index}
              item={item}
              onClose={onClose}
              downloadProgress={downloadProgress}
              variant="mobile"
            />
          ))}

          {dangerItems.map((item, index) => (
            <DangerItemButton
              key={index}
              item={item}
              onClose={onClose}
              variant="mobile"
            />
          ))}
        </div>

        <div className="p-5 pt-8 pb-8">
          <button
            className="flex items-center justify-center gap-3 w-full py-4 bg-black border border-black text-white rounded-lg hover:bg-white hover:text-black transition font-medium"
            onClick={() => {
              console.log('Copier le lien du Glims');
              onClose();
            }}>
            <Link size={20} />
            <span>Copier le lien du Glims</span>
          </button>
        </div>
      </div>
    </div>
  );
}
