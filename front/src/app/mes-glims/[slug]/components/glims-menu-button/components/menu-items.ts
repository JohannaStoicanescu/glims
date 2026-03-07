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
    onClick: () => {
      // TODO: Connecter à l'API pour récupérer et afficher les favoris de l'utilisateur
      console.log('//TODO: Voir mes favoris');
    },
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
    onClick: () => {
      // TODO: Connecter à l'API pour mettre à jour les préférences de notification du Glims
      console.log('Désactiver notifs');
    },
  },
  {
    icon: AlertCircle,
    label: 'Signaler un membre',
    onClick: () => {
      // TODO: Connecter à l'API pour envoyer un signalement
      console.log('//TODO: Signaler');
    },
  },
];

export const dangerItems: MenuItem[] = [
  {
    icon: Trash2,
    label: 'Supprimer le Glims',
    onClick: () => {
      // TODO: Connecter à l'API pour supprimer définitivement le Glims
      console.log('//TODO: Supprimer');
    },
  },
  {
    icon: DoorOpen,
    label: 'Quitter le Glims',
    onClick: () => {
      // TODO: Connecter à l'API pour que l'utilisateur quitte le Glims
      console.log('//TODO: Quitter');
    },
  },
];
