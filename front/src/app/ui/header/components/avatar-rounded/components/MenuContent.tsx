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
  const handleLogout = () => {
    // TODO: Logique de déconnexion
    onClose();
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
