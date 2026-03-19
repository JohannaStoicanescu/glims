'use client';

import React from 'react';
import { Crown } from '@/components/ui/icons';

interface PremiumButtonProps {
  onClick?: () => void;
}

export default function PremiumButton({ onClick }: PremiumButtonProps) {
  return (
    <button
      type="button"
      disabled
      onClick={
        onClick ??
        (() => {
          // TODO: Connecter au service de paiement/backend pour la mise à niveau premium
          console.log('Clicked Premium Upgrade');
        })
      }
      className="inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-4 text-sm font-bold sm:w-auto text-slate-900 transition bg-amber-200 hover:bg-amber-300 cursor-not-allowed shadow-sm">
      <span aria-hidden>
        <Crown
          size={18}
          fill="currentColor"
        />
      </span>
      Mise à niveau premium
    </button>
  );
}
