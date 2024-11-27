"use client";
import {
  createContext,
  useState,
  useContext,
  Dispatch,
  SetStateAction,
} from "react";

type userType = {
  username: string;
  sessionId: string;
};
type AuthContextType = {
  user: userType | null;
  setUser: Dispatch<SetStateAction<userType | null>>;
};

// Create context
const AuthContext = createContext<AuthContextType | null>(null);

// Provider to wrap the app
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<userType | null>(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to access the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};
