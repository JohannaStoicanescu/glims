"use client";

import { useAuthClient } from "@/hooks";
import { useEffect, useState } from "react";

type Session = {
  user: {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    email: string;
    emailVerified: boolean;
    name: string;
    image?: string | null | undefined;
  };
  session: {
    id: string;
    createdAt: Date;
    userAgent?: string | null | undefined;
  };
};

export default function Page() {
  const [sessionData, setSessionData] = useState<Session | null>(null);

  async function getSession() {
    const { data: session } = await useAuthClient().getSession()
    setSessionData(session);
  }

  useEffect(() => {
    getSession();
  }, []);

  return (
    <div className="text-center mt-10">
      <h1 className="text-2xl font-bold mb-4">Example Auth Page</h1>
      {sessionData ? (
        <div>
          <p className="mb-2">User ID: {sessionData.user.id}</p>
          <p className="mb-2">Email: {sessionData.user.email}</p>
          <p className="mb-2">Name: {sessionData.user.name}</p>
          <p className="mb-2">
            Email Verified: {sessionData.user.emailVerified ? "Yes" : "No"}
          </p>
          <p className="mb-2">Session ID: {sessionData.session.id}</p>
          <p className="mb-2">
            Session Created At: {new Date(sessionData.session.createdAt).toLocaleString()}
          </p>
        </div>
      ) : (
        <p>No session data available.</p>
      )}
    </div>
  );
}
