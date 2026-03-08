'use client';

import { useRouter } from 'next/navigation';
import { useAuthClient } from '@/hooks';
import ProfileHeader from './ProfileHeader';
import PremiumButton from './PremiumButton';
import AccountSection from './AccountSection';
import PrivacySection from './PrivacySection';
import LogoutButton from './LogoutButton';
import MenuDivider from './MenuDivider';

interface User {
  name: string;
  email: string;
  avatar: string;
  plan: string;
}

interface MenuContentProps {
  user: User;
  onClose: () => void;
}

export default function MenuContent({ user, onClose }: MenuContentProps) {
  const authClient = useAuthClient();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            onClose();
            router.push('/connexion');
            router.refresh(); // Important to refresh the session state
          },
        },
      });
    } catch (err) {
      console.error('Logout error:', err);
      // Fallback redirection in case of error
      onClose();
      window.location.href = '/connexion';
    }
  };

  return (
    <>
      <ProfileHeader
        avatar={user.avatar}
        name={user.name}
        email={user.email}
      />

      <PremiumButton />

      <AccountSection
        plan={user.plan}
        onLinkClick={onClose}
      />

      <MenuDivider />

      <PrivacySection onLinkClick={onClose} />

      <MenuDivider />

      <LogoutButton onLogout={handleLogout} />
    </>
  );
}
