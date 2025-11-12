'use client';

import { useAuthClient } from '@/hooks';
import { fetchApiFromClient } from '@/utils';
import { useEffect, useState } from 'react';

type Session = {
  user: {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    email: string;
    emailVerified: boolean;
    name: string;
    image?: string | null;
  };
  session: {
    id: string;
    createdAt: Date;
    userAgent?: string | null;
  };
};

export default function Page() {
  const [sessionData, setSessionData] = useState<Session | null>(null);
  const authClient = useAuthClient();
  // eslint-disable-next-line
  const [insecureRouteData, setInsecureRouteData] = useState<any>(null);
  // eslint-disable-next-line
  const [secureRouteData, setSecureRouteData] = useState<any>(null);

  async function getSession() {
    const { data: session } = await authClient.getSession();
    setSessionData(session);
  }

  useEffect(() => {
    getSession();
  });

  const fetchRoutes = () => {
    // Example of calling insecure route
    fetchApiFromClient('insecure')
      .then((res) => res.json())
      .then((data) => setInsecureRouteData(data))
      .catch((err) => setInsecureRouteData({ error: err.message }));

    // Example of calling secure route
    fetchApiFromClient(`secure`, {
      credentials: 'include', // include cookies for authentication
    })
      .then((res) => res.json())
      .then((data) => setSecureRouteData(data))
      .catch((err) => setSecureRouteData({ error: err.message }));
  };

  useEffect(() => {
    fetchRoutes();
  }, []);

  return (
    <div className="text-center mt-10">
      <button
        className="mb-4 px-4 py-2 bg-green-500 text-white rounded"
        onClick={() => {
          authClient.signIn.email({
            email: 'paul.lv.ohl@gmail.com',
            password: 'password',
          });
          getSession();
          fetchRoutes();
        }}>
        Sign In
      </button>
      <button
        className="mb-4 ml-5 px-4 py-2 bg-red-500 text-white rounded"
        onClick={() => {
          authClient.signOut();
          getSession();
          fetchRoutes();
        }}>
        Sign Out
      </button>
      <h1 className="text-2xl font-bold mb-4">Example Auth Page</h1>
      {sessionData ? (
        <div>
          <p className="mb-2">User ID: {sessionData.user.id}</p>
          <p className="mb-2">Email: {sessionData.user.email}</p>
          <p className="mb-2">Name: {sessionData.user.name}</p>
          <p className="mb-2">
            Email Verified: {sessionData.user.emailVerified ? 'Yes' : 'No'}
          </p>
          <p className="mb-2">Session ID: {sessionData.session.id}</p>
          <p className="mb-2">
            Session Created At:{' '}
            {new Date(sessionData.session.createdAt).toLocaleString()}
          </p>
        </div>
      ) : (
        <p>No session data available.</p>
      )}
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Insecure Route Data:</h2>
        {insecureRouteData ? (
          <pre className="text-left bg-gray-100 p-4 rounded">
            {JSON.stringify(insecureRouteData, null, 2)}
          </pre>
        ) : (
          <p>Loading insecure data</p>
        )}
      </div>
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Secure Route Data:</h2>
        {secureRouteData ? (
          <pre className="text-left bg-gray-100 p-4 rounded">
            {JSON.stringify(secureRouteData, null, 2)}
          </pre>
        ) : (
          <p>Loading Secure data</p>
        )}
      </div>
    </div>
  );
}
