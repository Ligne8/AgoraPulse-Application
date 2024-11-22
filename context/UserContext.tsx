import React, { createContext, useContext, useState, ReactNode } from 'react';

type UserRole = 'client' | 'merchant' | null;

export interface Tag {
  id: string;
  name: string;
}

interface UserContextProps {
  userRole: UserRole;
  // eslint-disable-next-line no-unused-vars
  setUserRole: (role: UserRole) => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userRole, setUserRole] = useState<UserRole>(null);

  return <UserContext.Provider value={{ userRole, setUserRole }}>{children}</UserContext.Provider>;
};

export const useUser = (): UserContextProps => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
