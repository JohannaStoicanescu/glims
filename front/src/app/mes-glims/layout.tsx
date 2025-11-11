import type { Metadata } from 'next';

import '../globals.css';
import { Header, SidePanel } from '../ui';

export const metadata: Metadata = {
  title: 'Mes Glims',
  description: 'Gérer les Glims, créer, modifier, supprimer',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen">
      <SidePanel />
      <div className="w-full flex flex-col">
        <Header />
        <div className="w-full px-2 sm:px-4 md:px-8 flex-1">{children}</div>
      </div>
    </div>
  );
}
