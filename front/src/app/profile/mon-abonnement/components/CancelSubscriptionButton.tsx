'use client';

import React, { useState } from 'react';
import { ConfirmationModal } from '@/app/ui';
import { AlertCircle } from '@/app/ui/icons';

export default function CancelSubscriptionButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleConfirm = () => {
    // TODO: Connecter à l'API pour annuler l'abonnement
    console.log('Abonnement annulé');
    // Logique d'annulation ici
    setIsModalOpen(false);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsModalOpen(true)}
        className="w-full sm:w-fit border border-rose-200 bg-white text-rose-600 py-3 px-6 rounded-xl text-sm font-bold flex items-center justify-center hover:bg-rose-50 hover:border-rose-300 transition shadow-sm cursor-pointer">
        Annuler mon abonnement
      </button>

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Résilier l'abonnement ?"
        message="Êtes-vous sûr ? Vos avantages premium resteront actifs jusqu'à la fin du mois en cours."
        confirmButtonText="Confirmer"
        cancelButtonText="Annuler"
        onConfirm={handleConfirm}
        onCancel={() => setIsModalOpen(false)}
        icon={<AlertCircle size={48} />}
        className="md:max-w-xl"
      />
    </>
  );
}
