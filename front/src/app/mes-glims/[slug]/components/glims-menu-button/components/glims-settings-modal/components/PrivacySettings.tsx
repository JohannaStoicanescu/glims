'use client';

import { useFormContext } from 'react-hook-form';
import { Trash2 } from '@/components/ui/icons';
import { GlimsSettingsForm } from '../GlimsSettingsModal';

export default function PrivacySettings() {
  const { watch, setValue } = useFormContext<GlimsSettingsForm>();

  const adminApprovalRequired = watch('adminApprovalRequired');
  const allowPhotoSharing = watch('allowPhotoSharing');
  const allowDownload = watch('allowDownload');
  const receiveNewsletters = watch('receiveNewsletters');

  const ToggleRow = ({
    label,
    description,
    name,
    value,
  }: {
    label: string;
    description?: string;
    name: keyof GlimsSettingsForm;
    value: boolean;
  }) => (
    <div className="flex items-start justify-between gap-4 py-2">
      <div className="flex flex-col gap-1">
        <span className="font-bold text-gray-900 leading-tight">{label}</span>
        {description && (
          <span className="text-sm text-gray-500 leading-snug">
            {description}
          </span>
        )}
      </div>
      <label className="relative inline-flex items-center cursor-pointer flex-shrink-0 mt-1">
        <input
          type="checkbox"
          className="sr-only peer"
          checked={value}
          onChange={(e) => setValue(name, e.target.checked)}
        />
        <div className="w-12 h-7 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-blue-600"></div>
      </label>
    </div>
  );

  return (
    <div className="flex flex-col gap-8 pb-4">
      {/* Gestion des invitations */}
      <div className="space-y-4">
        <ToggleRow
          label="Demander l’approbation de l’admin"
          description="Un admin doit approuver toutes les demandes de participation à la discussion"
          name="adminApprovalRequired"
          value={adminApprovalRequired}
        />

        <ToggleRow
          label="Autoriser le partage de photo"
          description="N’importe qui peut partager les contenus du Glims"
          name="allowPhotoSharing"
          value={allowPhotoSharing}
        />

        <ToggleRow
          label="Autoriser le téléchargement"
          description="N’importe quel membre peut télécharger les contenus du Glims"
          name="allowDownload"
          value={allowDownload}
        />
      </div>

      {/* Notifications */}
      <div className="space-y-4">
        <h4 className="text-lg font-bold text-gray-900 mb-2">Notifications</h4>

        <ToggleRow
          label="Recevoir les newsletters, les offres et les nouveautés de Glims par Email"
          name="receiveNewsletters"
          value={receiveNewsletters}
        />
      </div>

      {/* Supprimer le Glims */}
      <div className="space-y-4 pt-4">
        <button
          type="button"
          className="w-full flex items-center justify-center gap-2 bg-[#D13E34] hover:bg-[#B5352D] text-white font-bold py-4 px-6 rounded-xl transition-all cursor-pointer shadow-sm">
          <Trash2 size={20} />
          <span>Supprimer le Glims</span>
        </button>
      </div>
    </div>
  );
}
