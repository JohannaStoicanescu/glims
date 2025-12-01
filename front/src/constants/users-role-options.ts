import { userRole } from '@/types';

export const USERS_ROLE_OPTIONS: Record<userRole, string> = {
  readonly: 'Invité',
  uploaddownload: 'Éditeur',
  admin: 'Admin',
};

export const usersRoleOptions: Array<{ value: userRole; title: string }> = [
  {
    value: 'readonly',
    title: 'Invité',
  },
  {
    value: 'uploaddownload',
    title: 'Éditeur',
  },
  {
    value: 'admin',
    title: 'Admin',
  },
];
