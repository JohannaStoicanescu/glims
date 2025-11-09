import { useFormContext, Controller } from 'react-hook-form';
import { Mail, QrCode } from '@/app/ui/icons';

export function InviteSection() {
  const { control } = useFormContext();

  return (
    <Controller
      name="inviteMethod"
      control={control}
      defaultValue="email"
      render={({ field }) => (
        <div>
          <div className="flex w-full">
            <label
              className={`flex justify-center items-center cursor-pointer font-medium border-y border-l border-gray-200 p-3 rounded-y-xl rounded-l-xl w-full ${
                field.value === 'email'
                  ? 'bg-gray-100'
                  : 'bg-white hover:bg-gray-100'
              }`}>
              <Mail
                size={18}
                className="mr-2"
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
              className={`flex justify-center items-center cursor-pointer font-medium border border-gray-200 p-3 rounded-y-xl rounded-r-xl w-full ${
                field.value === 'link-and-qr-code'
                  ? 'bg-gray-100'
                  : 'bg-white hover:bg-gray-100'
              }`}>
              <QrCode
                size={18}
                className="mr-2"
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

          {/* CONDITIONAL CONTENT */}
          <div className="mt-4">
            {field.value === 'email' && (
              <h3 className="font-medium text-gray-800 mb-2">
                Invitation par email
              </h3>
            )}
            {field.value === 'link-and-qr-code' && (
              <h3 className="font-medium text-gray-800 mb-2">
                Lien et QR-code
              </h3>
            )}
          </div>
        </div>
      )}
    />
  );
}
