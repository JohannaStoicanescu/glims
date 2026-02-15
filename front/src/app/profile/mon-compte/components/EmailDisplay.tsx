'use client';

import React from 'react';

interface EmailDisplayProps {
  email: string;
}

export default function EmailDisplay({ email }: EmailDisplayProps) {
  return (
    <div className="pt-2">
      <div className="text-sm font-semibold text-slate-900">Email</div>
      <div className="mt-2 text-slate-600">{email}</div>
    </div>
  );
}
