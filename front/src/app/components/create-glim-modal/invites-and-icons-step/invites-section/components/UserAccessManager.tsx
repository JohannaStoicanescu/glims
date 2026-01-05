import { useEffect, useState } from 'react';

import { ChevronDown, Plus } from '@/app/ui/icons';
import { USERS_ROLE_OPTIONS } from '@/constants';
import { UserRole } from '@/types';

export default function UserAccessManager() {
  const [selectedRole, setSelectedRole] = useState<UserRole>('readonly');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [users, setUsers] = useState<
    { id: number; email: string; role: UserRole }[]
  >([]);

  // Logic to close the dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Find if the click was inside any dropdown
      const clickedInsideDropdown = (event.target as Element).closest(
        '.dropdown-container'
      );

      if (!clickedInsideDropdown) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  const handleAddUser = () => {
    const trimmed = email.trim();
    if (!trimmed) return;

    // évite les doublons basiques
    if (users.some((u) => u.email.toLowerCase() === trimmed.toLowerCase())) {
      setEmail('');
      setSelectedRole('readonly');
      return;
    }

    setUsers((prev) => [
      ...prev,
      {
        id: Date.now(),
        email: trimmed,
        role: selectedRole,
      },
    ]);

    setEmail('');
    setSelectedRole('readonly');
    setIsDropdownOpen(false);
  };

  return (
    <>
      <div className="flex items-center gap-2 pb-2">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 rounded-lg border border-gray-200 px-3 py-3 text-sm shadow-sm
        hover:border-orange-600 focus:outline-none focus:ring-1 focus:ring-orange-600 focus:border-orange-600"
        />

        <div className="relative dropdown-container">
          <button
            type="button"
            aria-haspopup="menu"
            aria-expanded={isDropdownOpen}
            id="role-menu-button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-3 text-sm bg-white shadow-sm
                       hover:bg-red-50 hover:text-orange-600 hover:border-orange-600 cursor-pointer transition
                       focus:outline-none focus:ring focus:ring-orange-500 focus:bg-red-50 focus:text-orange-600">
            {USERS_ROLE_OPTIONS[selectedRole]}
            <ChevronDown size={15} />
          </button>
          {isDropdownOpen && (
            <div
              role="menu"
              aria-labelledby="role-menu-button"
              aria-orientation="vertical"
              className="absolute right-0 mt-2 w-32 rounded-lg border border-gray-300 bg-white shadow-lg z-50 overflow-hidden">
              {Object.entries(USERS_ROLE_OPTIONS).map(
                ([role, label]): JSX.Element => (
                  <div
                    role="menuitem"
                    key={role}
                    onClick={(e) => {
                      e.preventDefault();
                      setIsDropdownOpen(false);
                      setSelectedRole(role as UserRole);
                    }}
                    className="block w-full px-4 py-2 text-left text-sm text-gray-700 
                        hover:bg-orange-50 hover:text-orange-600 cursor-pointer transition-colors
                        first:rounded-t-lg last:rounded-b-lg">
                    {label}
                  </div>
                )
              )}
            </div>
          )}
        </div>
        <button
          type="button"
          onClick={handleAddUser}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-lg shadow-sm
        hover:bg-red-50 hover:text-orange-600 hover:border-orange-600 cursor-pointer transition">
          <Plus size={15} />
        </button>
      </div>

      {/* TODO: add the number of invites + click to display theUserAccessManager Modal */}
    </>
  );
}
