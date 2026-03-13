import { Crown } from '@/app/ui/icons';

export default function PremiumButton() {
  return (
    <div className="px-4 pb-4">
      <button className="w-full flex items-center justify-center gap-2 py-3 text-slate-900 transition bg-amber-200 hover:bg-amber-300 cursor-pointer shadow-sm rounded-xl font-medium">
        <Crown
          fill="currentColor"
          className="w-5 h-5"
          aria-hidden="true"
        />
        <span>Mise à niveau premium</span>
      </button>
    </div>
  );
}
