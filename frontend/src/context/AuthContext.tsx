import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { login as loginRequest } from "../api/auth";
import { setToken } from "../api/client";

interface AuthContextValue {
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => localStorage.getItem("token") !== null,
  );

  const value = useMemo<AuthContextValue>(
    () => ({
      isAuthenticated,
      login: async (username: string, password: string) => {
        const data = await loginRequest(username, password);
        setToken(data.access_token);
        setIsAuthenticated(true);
        navigate("/participants");
      },
      logout: () => {
        setToken(null);
        setIsAuthenticated(false);
        navigate("/login");
      },
    }),
    [isAuthenticated, navigate],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
