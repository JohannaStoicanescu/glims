'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useSession } from '@/hooks';

export default function Home() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isPending) {
      if (session) {
        router.push('/mes-glims');
      } else {
        router.push('/connexion');
      }
    }
  }, [session, isPending, router]);

  return (
    <div className="flex h-screen items-center justify-center bg-white">
      <div className="w-12 h-12 border-4 border-orange-200 border-t-orange-600 rounded-full animate-spin" />
    </div>
  );
}
