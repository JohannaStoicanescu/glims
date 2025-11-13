import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Inscription',
  description: "Formulaire d'inscription Glims",
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
      <body className="bg-white h-svh">{children}</body>
    </html>
  );
}
