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
    <html lang="fr">
      <link
        rel="icon"
        href="/favicon.ico"
        sizes="any"
      />
      <body className="bg-white">
        <div className="flex">
          <SidePanel />
          <div className="w-full">
            <Header />
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
