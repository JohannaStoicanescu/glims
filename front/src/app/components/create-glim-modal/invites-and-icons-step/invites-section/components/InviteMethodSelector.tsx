import { ControllerRenderProps, FieldValues } from 'react-hook-form';

import { Mail, QrCode } from '@/app/ui/icons';

interface InviteMethodField {
  readonly field: ControllerRenderProps<FieldValues, 'inviteMethod'>;
}

export default function InviteMethodSelector({ field }: InviteMethodField) {
  return (
    <div className="flex w-full shadow-sm rounded-lg">
      <label
        className={`flex justify-center items-center cursor-pointer font-medium border-y border-l border-gray-200 p-3 rounded-y-lg rounded-l-lg w-full ${
          field.value === 'email' ? 'bg-gray-100' : 'bg-white hover:bg-gray-100'
        }`}>
        <Mail
          size={18}
          className="pr-2"
        />
        Par email
        <input
          type="radio"
          checked={field.value === 'email'}
          onChange={() => field.onChange('email')}
          className="appearance-none"
          aria-label="Inviter par email"
        />
      </label>

      <label
        className={`flex justify-center items-center cursor-pointer font-medium border border-gray-200 p-3 rounded-y-lg rounded-r-lg w-full ${
          field.value === 'link-and-qr-code'
            ? 'bg-gray-100'
            : 'bg-white hover:bg-gray-100'
        }`}>
        <QrCode
          size={18}
          className="pr-2"
        />
        Lien et QR-code
        <input
          type="radio"
          checked={field.value === 'link-and-qr-code'}
          onChange={() => field.onChange('link-and-qr-code')}
          className="appearance-none"
          aria-label="Inviter par lien et QR-code"
        />
      </label>
    </div>
  );
}
