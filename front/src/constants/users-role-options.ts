import { UserRole } from '@/types';

export const USERS_ROLE_OPTIONS: Record<UserRole, string> = {
  readonly: 'Invité',
  uploaddownload: 'Éditeur',
  admin: 'Admin',
};

export const usersRoleOptions: Array<{ value: UserRole; title: string }> = [
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
