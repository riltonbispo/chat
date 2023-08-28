'use client'

import { UserType } from "./types/ChatTypes";
import {
  ReactNode,
  createContext,
  useContext,
  useState
} from "react";

type UserContextType = {
  user: UserType | null;
  setUser: (user: UserType | null) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function ProviderUserContext({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserType | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
