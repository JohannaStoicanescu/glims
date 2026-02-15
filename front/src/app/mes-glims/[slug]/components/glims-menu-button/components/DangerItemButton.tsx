import { MenuItem } from './menu-items';

interface DangerItemButtonProps {
  item: MenuItem;
  onClose: () => void;
  variant?: 'desktop' | 'mobile';
}

export default function DangerItemButton({
  item,
  onClose,
  variant = 'desktop',
}: DangerItemButtonProps) {
  const isDesktop = variant === 'desktop';

  const handleClick = () => {
    item.onClick();
    onClose();
  };

  return (
    <button
      className={
        isDesktop
          ? 'flex items-center gap-3 px-4 py-3 w-full rounded-lg hover:bg-red-50 cursor-pointer transition text-left text-red-500'
          : 'flex items-center gap-4 px-4 py-4 w-full hover:bg-red-50 transition text-left text-red-500 border-t border-gray-100'
      }
      onClick={handleClick}>
      <item.icon size={isDesktop ? 20 : 22} />
      <span className={isDesktop ? '' : 'text-base'}>{item.label}</span>
    </button>
  );
}
