import { MenuItem } from './menu-items';

interface MenuItemButtonProps {
  item: MenuItem;
  onClose: () => void;
  downloadProgress: number;
  variant?: 'desktop' | 'mobile';
}

export default function MenuItemButton({
  item,
  onClose,
  downloadProgress,
  variant = 'desktop',
}: MenuItemButtonProps) {
  const isDesktop = variant === 'desktop';

  const handleClick = () => {
    item.onClick();
    if (!item.disabled) {
      if (item.label !== `Téléchargement... ${downloadProgress}%`) {
        onClose();
      }
    }
  };

  return (
    <button
      disabled={item.disabled}
      className={
        isDesktop
          ? `flex items-center gap-3 px-4 py-3 w-full rounded-lg hover:bg-gray-50 cursor-pointer transition text-left ${
              item.disabled ? 'opacity-70 cursor-wait' : ''
            }`
          : `flex items-center gap-4 px-4 py-4 w-full hover:bg-gray-50 transition text-left border-t border-gray-100 ${
              item.disabled ? 'opacity-70 cursor-wait' : ''
            }`
      }
      onClick={handleClick}>
      <item.icon
        size={isDesktop ? 20 : 22}
        className="text-gray-600"
        aria-hidden="true"
      />
      <span className={isDesktop ? '' : 'text-base'}>{item.label}</span>
    </button>
  );
}
