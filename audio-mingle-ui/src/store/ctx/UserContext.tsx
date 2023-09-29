'use client';
import { createContext, useContext, useState } from 'react';

import { UserProps } from '@app-types/user';

import { UserProviderProps, UserContextProps } from '../types';

const UserContext = createContext<UserContextProps>({
  user: {},
  setUser: () => {},
});

export function UserProvider({ children, session }: UserProviderProps) {
  const [user, setUser] = useState<UserProps | {}>({});
  return (
    <UserContext.Provider value={{ user: session?.user || user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUserContext = () => useContext(UserContext);
