import { ElementType } from 'react';

import {
  Heart,
  Download,
  BellOff,
  AlertCircle,
  Trash2,
  DoorOpen,
} from '@/app/ui/icons';

export interface Picture {
  id: string;
  author: string;
  download_url: string;
}

export interface MenuItem {
  icon: ElementType;
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

export const getMenuItems = (
  isDownloading: boolean,
  downloadProgress: number,
  handleDownloadAlbum: () => void
): MenuItem[] => [
  {
    icon: Heart,
    label: 'Voir mes favoris',
    onClick: () => console.log('Voir mes favoris'),
  },
  {
    icon: Download,
    label: isDownloading
      ? `Téléchargement... ${downloadProgress}%`
      : "Télécharger l'Album",
    onClick: handleDownloadAlbum,
    disabled: isDownloading,
  },
  {
    icon: BellOff,
    label: 'Désactiver les notifications',
    onClick: () => console.log('Désactiver notifs'),
  },
  {
    icon: AlertCircle,
    label: 'Signaler un membre',
    onClick: () => console.log('Signaler'),
  },
];

export const dangerItems: MenuItem[] = [
  {
    icon: Trash2,
    label: 'Supprimer le Glims',
    onClick: () => console.log('Supprimer'),
  },
  {
    icon: DoorOpen,
    label: 'Quitter le Glims',
    onClick: () => console.log('Quitter'),
  },
];
