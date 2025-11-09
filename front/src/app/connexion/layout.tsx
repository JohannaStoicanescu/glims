import type { Metadata } from 'next';

import '../globals.css';

export const metadata: Metadata = {
  title: 'Connexion',
  description: 'Page de connexion Glims',
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
      <body className="bg-white">{children}</body>
    </html>
  );
}
