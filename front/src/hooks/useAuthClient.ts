import { createAuthClient } from 'better-auth/react';

const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_API_URL!,
});

export default function useAuthClient() {
  return authClient;
}

export const useSession = authClient.useSession;
