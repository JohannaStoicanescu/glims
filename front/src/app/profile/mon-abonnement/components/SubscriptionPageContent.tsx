'use client';

import React from 'react';
import SubscriptionCard from './SubscriptionCard';
import BillingCard from './BillingCard';
import CancelSubscriptionButton from './CancelSubscriptionButton';

export default function SubscriptionPageContent() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 sm:px-0 py-4 sm:py-6 space-y-6">
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
        Mon abonnement
      </h1>

      <div className="space-y-6 pb-6">
        <SubscriptionCard />

        <BillingCard />

        <div className="pt-2 sm:w-fit">
          <CancelSubscriptionButton />
        </div>
      </div>
    </div>
  );
}
