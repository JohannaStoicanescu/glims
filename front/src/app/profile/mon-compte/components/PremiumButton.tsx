'use client';

import React from 'react';
import { Crown } from '@/app/ui/icons';

interface PremiumButtonProps {
  onClick?: () => void;
}

export default function PremiumButton({ onClick }: PremiumButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick ?? (() => console.log('Clicked'))}
      className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-amber-100 px-4 py-3 text-sm font-semibold text-amber-900 transition hover:bg-amber-200 sm:w-auto cursor-pointer">
      <span aria-hidden>
        <Crown size={15} />
      </span>
      Mise à niveau premium
    </button>
  );
}
