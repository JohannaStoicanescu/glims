import { SlidersHorizontal, Link } from '@/app/ui/icons';
import { MenuItem } from './menu-items';
import MenuItemButton from './MenuItemButton';
import DangerItemButton from './DangerItemButton';

interface MobileDrawerProps {
  menuItems: MenuItem[];
  dangerItems: MenuItem[];
  downloadProgress: number;
  onClose: () => void;
  onOpenSettings: () => void;
}

export default function MobileDrawer({
  menuItems,
  dangerItems,
  downloadProgress,
  onClose,
  onOpenSettings,
}: MobileDrawerProps) {
  return (
    <div className="flex flex-col pb-8">
      <div className="flex justify-center pt-3 pb-2">
        <div className="w-12 h-1 bg-gray-300 rounded-full" />
      </div>

      <div className="px-5 pb-4">
        <h2
          id="mobile-menu-title"
          className="text-xl font-bold">
          Gérer le Glims
        </h2>
      </div>

      <div className="px-5 pb-4">
        <button
          className="flex items-center justify-center gap-3 w-full py-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition cursor-pointer"
          onClick={onOpenSettings}>
          <SlidersHorizontal size={18} aria-hidden="true" />
          <span className="font-medium">Paramètres</span>
        </button>
      </div>

      <div className="px-4 pb-4">
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

      <div className="p-5 pt-4">
        <button
          className="flex items-center justify-center gap-3 w-full py-4 bg-black border border-black text-white rounded-lg hover:bg-white hover:text-black transition font-medium cursor-pointer"
          onClick={() => {
            // TODO: Logique pour copier le lien réel du Glims (éventuellement via l'API pour un lien court)
            console.log('Copier le lien du Glims');
            onClose();
          }}>
          <Link size={20} aria-hidden="true" />
          <span>Copier le lien du Glims</span>
        </button>
      </div>
    </div>
  );
}
