import { useFormContext, Controller } from 'react-hook-form';

import InviteMethodSelector from './components/InviteMethodSelector';
import UserAccessManager from './components/UserAccessManager';

export function InvitesSection() {
  const { control } = useFormContext();

  return (
    <Controller
      name="inviteMethod"
      control={control}
      defaultValue="email"
      render={({ field }) => (
        <div>
          <InviteMethodSelector field={field} />

          {/* CONDITIONAL CONTENT FOR INVITE METHOD */}
          <div className="mt-4">
            {field.value === 'email' && <UserAccessManager />}
            {field.value === 'link-and-qr-code' && (
              <h3 className="text-center text-gray-800 mb-2">
                Vous pourrez partager le lien et le{' '}
                <span className="block">QR code une fois le Glims créé.</span>
              </h3>
            )}
          </div>
        </div>
      )}
    />
  );
}
