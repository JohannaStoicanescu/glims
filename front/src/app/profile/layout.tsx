import type { Metadata } from 'next';

import { Header, SidePanel } from '../ui';
import ProfileNavBar from './components/ProfileNavBar';
import '../globals.css';

export const metadata: Metadata = {
  title: 'Profile',
  description: 'Profile utilisateur',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen overflow-hidden">
      <SidePanel />
      <div className="w-full h-full flex flex-col min-w-0">
        <Header>
          <ProfileNavBar />
        </Header>
        <div className="w-full flex flex-col px-2 sm:px-4 md:px-8 min-h-0">
          <div className="md:hidden">
            <ProfileNavBar />
            <div className="h-[8px] bg-white w-full" />
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
