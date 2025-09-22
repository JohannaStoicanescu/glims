import { createContext } from 'react';

export interface NewUser {
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  password: string | null;
  profileImage?: File | null;
}

export const NewUserContext = createContext<{
  newUserData: NewUser;
  setNewUserData: (data: NewUser) => void;
} | null>(null);
