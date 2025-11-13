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
    <div className="flex h-full">
      <SidePanel />
      <div className="w-full h-full flex flex-col">
        <Header />
        <div className="w-full flex flex-1 px-4 md:px-8">{children}</div>
      </div>
    </div>
  );
}
