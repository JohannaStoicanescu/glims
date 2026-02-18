'use client';

import { useMemo, useState, useRef, useEffect } from 'react';

type User = {
  id: number;
  name: string;
  lastname: string;
  initials: string;
  email: string;
};

const InviteMembersStep = () => {
  const mockUsers: User[] = [
    {
      id: 1,
      name: 'Rémi',
      lastname: 'Guerin',
      initials: 'RE',
      email: 'rémi@example.com',
    },
    {
      id: 2,
      name: 'Claire',
      lastname: 'Guerin',
      initials: 'CL',
      email: 'claire@example.com',
    },
    {
      id: 3,
      name: 'Tanguy',
      lastname: 'Patate',
      initials: 'TA',
      email: 'tanguy@example.com',
    },
    {
      id: 4,
      name: 'Perrine',
      lastname: 'Lulin',
      initials: 'PE',
      email: 'perrine@example.com',
    },
    {
      id: 5,
      name: 'Baptiste',
      lastname: 'Laporte',
      initials: 'BA',
      email: 'baptiste@example.com',
    },
  ];
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<User[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q)
      return mockUsers.filter((u) => !selected.find((s) => s.id === u.id));
    return mockUsers.filter(
      (u) =>
        !selected.find((s) => s.id === u.id) &&
        (`${u.name} ${u.lastname}`.toLowerCase().includes(q) ||
          u.email.toLowerCase().includes(q) ||
          u.initials.toLowerCase().includes(q))
    );
  }, [query, mockUsers, selected]);

  useEffect(() => {
    function handleOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener('click', handleOutside);
    return () => document.removeEventListener('click', handleOutside);
  }, []);

  function selectUser(u: User) {
    setSelected((s) => [...s, u]);
    setQuery('');
    setIsOpen(false);
  }

  function removeUser(id: number) {
    setSelected((s) => s.filter((u) => u.id !== id));
  }

  return (
    <>
      <h2 className="text-2xl font-bold text-center mb-8">
        Inviter des membres
      </h2>
      {/* Search input with icon */}
      <div
        className="relative mb-4"
        ref={containerRef}>
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
          <svg
            width="20"
            height="20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24">
            <circle
              cx="11"
              cy="11"
              r="8"
            />
            <line
              x1="21"
              y1="21"
              x2="16.65"
              y2="16.65"
            />
          </svg>
        </span>
        <input
          className="w-full rounded-xl border border-gray-200 bg-gray-50 pl-10 pr-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-orange-200 placeholder-gray-400"
          placeholder="Ajouter des personnes ou des groupes"
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
        />

        {isOpen && filtered.length > 0 && (
          <ul className="absolute left-0 right-0 mt-2 max-h-48 overflow-auto rounded-md border bg-white shadow-lg z-50">
            {filtered.map((u) => (
              <li
                key={u.id}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => selectUser(u)}>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-bold">
                    {u.initials}
                  </div>
                  <div className="text-sm">
                    <div className="font-medium">
                      {u.name} {u.lastname}
                    </div>
                    <div className="text-xs text-gray-500">{u.email}</div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      {/* Avatars */}
      <div className="flex gap-2 mb-8 flex-wrap">
        {selected.map((u) => (
          <button
            key={u.id}
            type="button"
            onClick={() => removeUser(u.id)}
            className="inline-flex items-center gap-2 rounded-full bg-orange-100 text-orange-700 px-3 py-1 text-sm font-medium"
            title={`Retirer ${u.name} ${u.lastname}`}>
            <span className="rounded-full bg-orange-500 text-white px-2 py-0.5 text-xs font-bold">
              {u.initials}
            </span>
            <span className="hidden sm:inline">{u.name}</span>
            <span className="ml-1 text-xs text-orange-700">×</span>
          </button>
        ))}
      </div>
      {/* Divider */}
      <div className="border-t border-gray-200 my-6" />
      {/* Toggle */}
      <div className="flex items-center gap-3 mb-8">
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            disabled
          />
          <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-2 peer-focus:ring-orange-200 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600"></div>
        </label>
        <span className="text-base font-medium text-gray-900">
          Afficher les réactions
        </span>
      </div>
    </>
  );
};

export default InviteMembersStep;
