'use client';

import { useEffect, useRef, useState } from 'react';
import JSZip from 'jszip';

import { Picture, getMenuItems, dangerItems } from './menu-items';
import DesktopDropdown from './DesktopDropdown';
import MobileDrawer from './MobileDrawer';

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
  const menuRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);

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

  // Close with escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      // Prevent body scroll on mobile
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      // Delay to prevent the opening click from immediately closing
      setTimeout(() => {
        document.addEventListener('mousedown', handleClickOutside);
      }, 0);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const menuItems = getMenuItems(
    isDownloading,
    downloadProgress,
    handleDownloadAlbum
  );

  return (
    <>
      <DesktopDropdown
        menuRef={menuRef}
        menuItems={menuItems}
        dangerItems={dangerItems}
        downloadProgress={downloadProgress}
        onClose={onClose}
      />
      <MobileDrawer
        menuRef={menuRef}
        menuItems={menuItems}
        dangerItems={dangerItems}
        downloadProgress={downloadProgress}
        onClose={onClose}
      />
    </>
  );
}
