import { UseFormProps } from 'react-hook-form';

// TODO: update values when the form will be complete
export interface GlimFormData {
  // STEP 1 - Profile
  name: string;
  description: string;
  accessibility: 'private' | 'public';
  userRole:
    | 'readonly'
    | 'uploadonly'
    | 'downloadonly'
    | 'uploaddownload'
    | 'admin';
  // STEP 2 - Invites and icons
  inviteMethod: 'email' | 'link-and-qr-code';
  showReactions: boolean;
}

export const defaultFormValues: GlimFormData = {
  // STEP 1 - Profile
  name: '',
  description: '',
  accessibility: 'private',
  userRole: 'readonly',
  // STEP 2 - Invites and icons
  inviteMethod: 'email',
  showReactions: false,
};

export const defaultFormConfig: UseFormProps<GlimFormData> = {
  mode: 'onChange',
  defaultValues: defaultFormValues,
};
