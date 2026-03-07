'use client';

import React from 'react';

export default function BillingCard() {
  const billingInfo = [
    { label: 'Prix', value: '50€/mois' },
    { label: 'Période d’abonnement', value: 'mensuel' },
    { label: 'Date de renouvellement', value: '16/09/2026' },
  ];

  return (
    <div className="rounded-2xl bg-slate-50 p-4 md:p-6 flex flex-col gap-4">
      <h2 className="text-lg font-bold text-slate-900">Payement et factures</h2>

      <div className="space-y-2">
        {billingInfo.map((item, index) => (
          <div
            key={index}
            className="flex justify-between items-center py-0.5">
            <span className="text-xs font-medium text-slate-600">
              {item.label}
            </span>
            <span className="text-xs font-bold text-slate-900">
              {item.value}
            </span>
          </div>
        ))}
      </div>

      <button
        type="button"
        className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold flex items-center justify-center hover:bg-slate-800 transition shadow-sm cursor-pointer">
        Voir l’historique des factures
      </button>
    </div>
  );
}
