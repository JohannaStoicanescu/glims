import { DoorOpen } from '@/app/ui/icons';

interface LogoutButtonProps {
  onLogout: () => void;
}

export default function LogoutButton({ onLogout }: LogoutButtonProps) {
  return (
    <div className="px-4 py-2 pb-4">
      <button
        onClick={onLogout}
        className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors text-gray-700 w-full">
        <DoorOpen className="w-5 h-5" />
        <span>Me déconnecter</span>
      </button>
    </div>
  );
}
