'use client';

import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Modal, ConfirmationModal } from '@/components';
import {
  X,
  SlidersHorizontal,
  Users,
  Lock,
  Bell,
  HardDrive,
  DoorOpen,
} from '@/components/ui/icons';
import { useIsMobile } from '@/hooks/use-media-query';
import GeneralSettings from './components/GeneralSettings';
import PrivacySettings from './components/PrivacySettings';
import StorageSettings from './components/StorageSettings';
import MembersSettings from '../../../glims-settings-modal/components/MembersSettings';
import { useUpdateUsersFolder } from '@/hooks';

interface GlimsSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  glimName?: string;
  folderId: string;
}

export type SettingsTab =
  | 'general'
  | 'members'
  | 'privacy'
  | 'storage'
  | 'notifications';

export type GlimRole = 'Lecteur' | 'Éditeur' | 'Administrateur';

export interface GlimMember {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
  role: GlimRole;
}

export interface GlimsSettingsForm {
  name: string;
  description: string;
  coverPhoto: string;
  reactionsEnabled: boolean;
  reactions: string[];
  // Members
  members: GlimMember[];
  invitations: GlimMember[];
  // Privacy & Notifications
  adminApprovalRequired: boolean;
  allowPhotoSharing: boolean;
  allowDownload: boolean;
  receiveNewsletters: boolean;
}

export default function GlimsSettingsModal({
  isOpen,
  onClose,
  glimName = 'Le nom du Glims',
  folderId,
}: GlimsSettingsModalProps) {
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState<SettingsTab>('general');
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const updateFolder = useUpdateUsersFolder();

  const methods = useForm<GlimsSettingsForm>({
    defaultValues: {
      name: glimName,
      description: '',
      coverPhoto: '/diana.jpg', // Placeholder
      reactionsEnabled: true,
      reactions: ['👍', '🥳', '😮', '😂', '😎'],
      members: [
        {
          id: '1',
          email: 'DamienHamont@gmail.com',
          name: 'Damien Hamont',
          avatar: '/jeff.jpg',
          role: 'Éditeur',
        },
        {
          id: '2',
          email: 'Johanna@gmail.com',
          name: 'Johanna',
          avatar: '/diana.jpg',
          role: 'Administrateur',
        },
      ],
      invitations: [{ id: '3', email: 'paul@gmail.com', role: 'Lecteur' }],
      adminApprovalRequired: false,
      allowPhotoSharing: true,
      allowDownload: true,
      receiveNewsletters: false,
    },
  });

  const {
    formState: { isDirty },
    reset,
  } = methods;

  const handleClose = () => {
    reset();
    setIsConfirmationModalOpen(false);
    onClose();
  };

  const requestClose = () => {
    if (isDirty) {
      setIsConfirmationModalOpen(true);
    } else {
      handleClose();
    }
  };

  const tabs = [
    {
      id: 'general' as const,
      label: 'Paramètres généraux',
      icon: SlidersHorizontal,
    },
    { id: 'members' as const, label: 'Membres du Glims', icon: Users },
    { id: 'privacy' as const, label: 'Confidentialité', icon: Lock },
    { id: 'notifications' as const, label: 'Notifications', icon: Bell },
    { id: 'storage' as const, label: 'Stockage', icon: HardDrive },
  ];

  const onSubmit = (data: GlimsSettingsForm) => {
    updateFolder.mutate(
      {
        folderId,
        data: { title: data.name, description: data.description },
      },
      {
        onSuccess: () => {
          reset(data);
          onClose();
        },
      }
    );
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={requestClose}
        showOverlay
        className="w-full md:max-w-4xl rounded-t-3xl md:rounded-3xl h-[85vh] md:h-auto overflow-hidden">
        <div className="flex flex-col md:flex-row h-full">
          {/* SIDEBAR (Desktop) / TOP NAV (Mobile) */}
          <div
            className={`
            flex flex-col border-gray-100
            ${
              isMobile
                ? 'w-full border-b overflow-x-auto'
                : 'w-72 border-r bg-gray-50/50 p-6 pt-12'
            }
          `}>
            {!isMobile && (
              <h2 className="text-xl font-bold mb-8 px-2">Paramètres</h2>
            )}

            <nav
              className={`
                        flex 
                        ${isMobile ? 'flex-row w-full justify-between p-2 px-4' : 'flex-col gap-1'}
                      `}>
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;

                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`
                                flex items-center rounded-xl transition-all cursor-pointer
                                ${
                                  isActive
                                    ? 'bg-orange-50 text-orange-600 font-semibold'
                                    : 'text-gray-500 hover:bg-gray-100/50 hover:text-gray-700'
                                }
                                ${
                                  isMobile
                                    ? 'p-3 flex-1 justify-center'
                                    : 'w-full gap-3 px-4 py-3 text-left'
                                }
                              `}
                    title={tab.label}>
                    <Icon size={isMobile ? 24 : 20} />
                    {!isMobile && <span>{tab.label}</span>}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* CONTENT AREA */}
          <div className="flex-1 flex flex-col min-h-0 bg-white relative">
            {/* Header */}
            <div className="flex items-center justify-between p-6 pb-2">
              <h3 className="text-xl font-bold text-gray-900">
                {tabs.find((t) => t.id === activeTab)?.label}
              </h3>
              <button
                onClick={requestClose}
                className="p-2 hover:bg-gray-100 rounded-full transition cursor-pointer text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 pt-2">
              <FormProvider {...methods}>
                <form
                  onSubmit={methods.handleSubmit(onSubmit)}
                  className="h-full flex flex-col">
                  {activeTab === 'general' && <GeneralSettings />}
                  {activeTab === 'members' && <MembersSettings />}
                  {activeTab === 'privacy' && <PrivacySettings />}
                  {activeTab === 'storage' && <StorageSettings />}

                  {!['general', 'members', 'privacy', 'storage'].includes(
                    activeTab
                  ) && (
                    <div className="flex flex-col items-center justify-center py-12 text-gray-400 italic">
                      Cette section sera disponible prochainement.
                    </div>
                  )}
                </form>
              </FormProvider>
            </div>
          </div>
        </div>
      </Modal>

      <ConfirmationModal
        isOpen={isConfirmationModalOpen}
        onClose={() => setIsConfirmationModalOpen(false)}
        title="Quitter sans enregistrer"
        message="Êtes-vous sûr ? Les modifications non enregistrées seront perdues."
        confirmButtonText="Quitter"
        cancelButtonText="Annuler"
        onConfirm={handleClose}
        onCancel={() => setIsConfirmationModalOpen(false)}
        icon={<DoorOpen size={48} />}
      />
    </>
  );
}
