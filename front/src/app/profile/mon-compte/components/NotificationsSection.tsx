'use client';

import React from 'react';

interface NotificationsSectionProps {
  newsletter: boolean;
  onToggle: () => void;
  isLoading?: boolean;
}

export default function NotificationsSection({
  newsletter,
  onToggle,
  isLoading = false,
}: NotificationsSectionProps) {
  return (
    <div>
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
        Notifications
      </h2>

      <div className="pt-6 flex gap-4 items-center justify-between">
        <p className="text-slate-900 text-sm md:text-base">
          Recevoir les newsletters, les offres et les nouveautés de Glims par
          Email
        </p>

        <button
          type="button"
          onClick={onToggle}
          disabled={isLoading}
          className={`relative inline-flex h-8 w-14 items-center rounded-full transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed
            ${newsletter ? 'bg-slate-900' : 'bg-slate-200'}`}
          aria-pressed={newsletter}
          aria-label="Activer/désactiver la newsletter">
          <span
            className={`inline-block h-6 w-6 transform rounded-full bg-white shadow transition 
              ${newsletter ? 'translate-x-7' : 'translate-x-1'}`}
          />
        </button>
      </div>
    </div>
  );
}
