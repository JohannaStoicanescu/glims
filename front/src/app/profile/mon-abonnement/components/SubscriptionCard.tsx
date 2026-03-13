'use client';

import React from 'react';
import { Crown } from '@/app/ui/icons';

export default function SubscriptionCard() {
  const currentStorage = 3.5;
  const maxStorage = 5;
  const percentage = (currentStorage / maxStorage) * 100;

  return (
    <div className="rounded-2xl bg-slate-50 p-4 md:p-6 flex flex-col gap-4">
      <div className="space-y-1">
        <h2 className="text-lg font-bold text-slate-900">Formule gratuite</h2>
        <p className="text-xs text-slate-600 leading-relaxed max-w-md">
          Avec le forfait gratuit, vous bénéficiez de 5Go de stockage et de
          toutes les fonctionnalités essentielles de Glims.
        </p>
      </div>

      <div className="space-y-2">
        <div className="text-xs font-semibold text-slate-900">Stockage</div>
        <div className="text-xs font-bold text-slate-900">
          {currentStorage}Go/{maxStorage}Go
        </div>

        {/* Progress Bar */}
        <div 
          className="w-full h-2 bg-slate-200 rounded-full overflow-hidden"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={maxStorage}
          aria-valuenow={currentStorage}
          aria-label={`Stockage utilisé : ${currentStorage} Go sur ${maxStorage} Go`}>
          <div
            className="h-full bg-blue-600 rounded-full transition-all duration-500"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      <button
        type="button"
        className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition shadow-sm cursor-pointer">
        <Crown
          size={16}
          fill="currentColor"
        />
        Mise à niveau premium
      </button>
    </div>
  );
}
