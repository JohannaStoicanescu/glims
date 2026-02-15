import { Crown } from '@/app/ui/icons';

export default function PremiumButton() {
  return (
    <div className="px-4 pb-4">
      <button className="w-full flex items-center justify-center gap-2 py-3 bg-amber-50 cursor-pointer  hover:bg-amber-100 border border-amber-200 rounded-xl text-amber-700 font-medium transition-colors">
        <Crown className="w-5 h-5" />
        <span>Mise à niveau premium</span>
      </button>
    </div>
  );
}
