import type { Metadata } from 'next';

import '../globals.css';
import { NavBar } from '../ui';

export const metadata: Metadata = {
  title: 'Messages',
  description: 'Les notifications nouvelles et anciennes',
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
        <NavBar />
        {children}
      </body>
    </html>
  );
}
