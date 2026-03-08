'use client';

import { useState } from 'react';
import JSZip from 'jszip';

import { Picture, getMenuItems, getDangerItems } from './menu-items';
import DesktopDropdown from './DesktopDropdown';
import MobileDrawer from './MobileDrawer';
import { Modal, ConfirmationModal } from '@/app/ui';
import { useIsMobile } from '@/hooks/use-media-query';
import { Trash2, DoorOpen } from '@/app/ui/icons';
import GlimsSettingsModal from './glims-settings-modal/GlimsSettingsModal';

interface GlimsOptionsMenuProps {
  isOpen: boolean;
  onClose: () => void;
  pictures?: Picture[];
  glimsName?: string;
}

export default function GlimsOptionsMenu({
  isOpen,
  onClose,
  pictures = [],
  glimsName = 'album',
}: GlimsOptionsMenuProps) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false);
  const isMobile = useIsMobile();

  // Function to download all photos as a ZIP file
  const handleDownloadAlbum = async () => {
    if (pictures.length === 0) {
      console.log('Aucune photo à télécharger');
      return;
    }

    setIsDownloading(true);
    setDownloadProgress(0);

    try {
      const zip = new JSZip();
      const folder = zip.folder(glimsName);

      // Download each image
      for (let i = 0; i < pictures.length; i++) {
        const picture = pictures[i];
        try {
          const response = await fetch(picture.download_url);
          const blob = await response.blob();
          const fileName = `${picture.author}-${picture.id}.jpg`;
          folder?.file(fileName, blob);

          // Update the download progress
          setDownloadProgress(Math.round(((i + 1) / pictures.length) * 100));
        } catch (error) {
          console.error(
            `Erreur lors du téléchargement de l'image ${picture.id}:`,
            error
          );
        }
      }

      // Generate the ZIP file
      const content = await zip.generateAsync({ type: 'blob' });

      // Download the ZIP file
      const url = window.URL.createObjectURL(content);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${glimsName}.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      onClose();
    } catch (error) {
      console.error('Erreur lors de la création du ZIP:', error);
    } finally {
      setIsDownloading(false);
      setDownloadProgress(0);
    }
  };

  const handleOpenSettings = () => {
    setIsSettingsOpen(true);
    onClose();
  };

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
    onClose();
  };

  const handleLeaveClick = () => {
    setIsLeaveModalOpen(true);
    onClose();
  };

  const menuItems = getMenuItems(
    isDownloading,
    downloadProgress,
    handleDownloadAlbum
  );

  const dangerItems = getDangerItems(handleDeleteClick, handleLeaveClick);

  return (
    <>
      {isMobile ? (
        <Modal
          isOpen={isOpen}
          onClose={onClose}
          position="bottom"
          ariaLabelledBy="mobile-menu-title">
          <MobileDrawer
            menuItems={menuItems}
            dangerItems={dangerItems}
            downloadProgress={downloadProgress}
            onClose={onClose}
            onOpenSettings={handleOpenSettings}
          />
        </Modal>
      ) : (
        <Modal
          isOpen={isOpen}
          onClose={onClose}
          showOverlay={false}
          usePortal={false} // Stay relative to GlimsMenuButton trigger
          position="custom"
          className="absolute right-0 top-full mt-2 w-72 border border-gray-100 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="pointer-events-auto">
            <DesktopDropdown
              menuItems={menuItems}
              dangerItems={dangerItems}
              downloadProgress={downloadProgress}
              onClose={onClose}
              onOpenSettings={handleOpenSettings}
            />
          </div>
        </Modal>
      )}

      <GlimsSettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        glimName={glimsName}
      />

      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Supprimer le Glims"
        message={`Êtes-vous sûr de vouloir supprimer "${glimsName}" ? Cette action est irréversible et tous les membres perdront l'accès aux photos.`}
        confirmButtonText="Supprimer"
        cancelButtonText="Annuler"
        onConfirm={() => {
          // TODO: Appel API pour supprimer
          console.log('Glims supprimé');
        }}
        icon={<Trash2 size={48} />}
      />

      <ConfirmationModal
        isOpen={isLeaveModalOpen}
        onClose={() => setIsLeaveModalOpen(false)}
        title="Quitter le Glims"
        message={`Êtes-vous sûr de vouloir quitter "${glimsName}" ? Vous n'aurez plus accès à cet album photo.`}
        confirmButtonText="Quitter"
        cancelButtonText="Annuler"
        onConfirm={() => {
          // TODO: Appel API pour quitter
          console.log('Glims quitté');
        }}
        icon={<DoorOpen size={48} />}
      />
    </>
  );
}
